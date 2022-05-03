import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeService } from 'src/employee/employee.service';
import { PetOrderItem } from 'src/pet-order-item/entities/pet-order-item.entity';
import { PetService } from 'src/pet/pet.service';
import { ProductOrderItem } from 'src/product-order-item/entities/product-order-item.entity';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { ProductService } from 'src/product/product.service';
import { ServiceOrderItem } from 'src/service-order-item/entities/service-order-item.entity';
import { ServiceService } from 'src/service/service.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    private readonly serviceService: ServiceService,
    private readonly petService: PetService,
    private readonly productService: ProductService,
    private readonly employeeService: EmployeeService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    let total = 0;
    const order = await this.orderRepo.create(createOrderDto);
    order.shipCost = 30000;
    order.serviceOrderItems = [];
    order.productOrderItems = [];
    order.petOrderItems = [];
    // Validate
    for (let i = 0; i < createOrderDto.pets.length; i++) {
      const pet = await this.petService.findOne(createOrderDto.pets[i].id);
      if (pet.status === 'Hết hàng')
        throw new BadRequestException('Pet is out of stock');
    }
    for (let i = 0; i < createOrderDto.products.length; i++) {
      const product = await this.productService.findOne(
        createOrderDto.products[i].id,
      );
      if (product.quantity < createOrderDto.products[i].quantity)
        throw new BadRequestException('Exceed available quantity !');
    }
    // Add service item
    for (let i = 0; i < createOrderDto.services.length; i++) {
      const serviceItem = new ServiceOrderItem();
      const service = await this.serviceService.findOne(
        createOrderDto.services[i].id,
      );
      const doneBy = await this.employeeService.findOne(
        createOrderDto.services[i].doneBy,
      );
      serviceItem.name = service.name;
      serviceItem.price = service.price;
      serviceItem.doneBy = doneBy;
      serviceItem.service = service;
      order.serviceOrderItems.push(serviceItem);
      total += service.price;
    }
    // Add pet item
    for (let i = 0; i < createOrderDto.pets.length; i++) {
      const petItem = new PetOrderItem();
      const pet = await this.petService.findOne(createOrderDto.pets[i].id);
      if (pet.status === 'Hết hàng')
        throw new BadRequestException('Pet is out of stock');

      petItem.name = pet.name;
      petItem.price = pet.price;
      petItem.pet = pet;
      order.petOrderItems.push(petItem);
      total += pet.price;
      this.petService.update(createOrderDto.pets[i].id, { status: 'Hết hàng' });
    }
    //  Add product item

    for (let i = 0; i < createOrderDto.products.length; i++) {
      const productItem = new ProductOrderItem();
      const product = await this.productService.findOne(
        createOrderDto.products[i].id,
      );
      if (product.quantity < createOrderDto.products[i].quantity)
        throw new BadRequestException('Exceed available quantity !');
      productItem.name = product.name;
      productItem.product = product;
      productItem.quantity = createOrderDto.products[i].quantity;
      productItem.price = product.price;
      order.productOrderItems.push(productItem);
      total += product.price * productItem.quantity;
      const updateProductDto = new UpdateProductDto();
      updateProductDto.quantity =
        product.quantity - createOrderDto.products[i].quantity;
      this.productService.update(
        createOrderDto.products[i].id,
        updateProductDto,
      );
    }
    order.total = total;
    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne(id, {
      join: {
        alias: 'order',
        leftJoinAndSelect: {
          productOrderItems: 'order.productOrderItems',
          product: 'productOrderItems.product',
          serviceOrderItems: 'order.serviceOrderItems',
          service: 'serviceOrderItems.service',
          petOrderItems: 'order.petOrderItems',
          pet: 'petOrderItems.pet',
        },
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    let order = await this.findOne(id);
    order = { ...order, ...updateOrderDto };
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
