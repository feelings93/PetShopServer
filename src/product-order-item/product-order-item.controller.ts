import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductOrderItemService } from './product-order-item.service';
import { CreateProductOrderItemDto } from './dto/create-product-order-item.dto';
import { UpdateProductOrderItemDto } from './dto/update-product-order-item.dto';

@Controller('product-order-item')
export class ProductOrderItemController {
  constructor(private readonly productOrderItemService: ProductOrderItemService) {}

  @Post()
  create(@Body() createProductOrderItemDto: CreateProductOrderItemDto) {
    return this.productOrderItemService.create(createProductOrderItemDto);
  }

  @Get()
  findAll() {
    return this.productOrderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productOrderItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductOrderItemDto: UpdateProductOrderItemDto) {
    return this.productOrderItemService.update(+id, updateProductOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productOrderItemService.remove(+id);
  }
}
