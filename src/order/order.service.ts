import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeService } from 'src/employee/employee.service';
import { PetOrderItem } from 'src/pet-order-item/entities/pet-order-item.entity';
import { PetService } from 'src/pet/pet.service';
import { ProductOrderItem } from 'src/product-order-item/entities/product-order-item.entity';
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
      order.serviceOrderItems.push(serviceItem);
      total += service.price;
    }
    // Add pet item
    for (let i = 0; i < createOrderDto.pets.length; i++) {
      const petItem = new PetOrderItem();
      const pet = await this.petService.findOne(createOrderDto.pets[i].id);
      petItem.name = pet.name;
      petItem.price = pet.price;
      order.petOrderItems.push(petItem);
      total += pet.price;
    }
    //  Add product item
    for (let i = 0; i < createOrderDto.products.length; i++) {
      const productItem = new ProductOrderItem();
      const product = await this.productService.findOne(
        createOrderDto.products[i].id,
      );
      productItem.name = product.name;
      productItem.quantity = createOrderDto.products[i].quantity;
      productItem.price = product.price;
      order.productOrderItems.push(productItem);
      total += product.price * productItem.quantity;
    }
    order.total = total;
    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne(id);
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
