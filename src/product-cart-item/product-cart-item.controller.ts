import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductCartItemService } from './product-cart-item.service';
import { CreateProductCartItemDto } from './dto/create-product-cart-item.dto';
import { UpdateProductCartItemDto } from './dto/update-product-cart-item.dto';

@Controller('product-cart-item')
export class ProductCartItemController {
  constructor(private readonly productCartItemService: ProductCartItemService) {}

  @Post()
  create(@Body() createProductCartItemDto: CreateProductCartItemDto) {
    return this.productCartItemService.create(createProductCartItemDto);
  }

  @Get()
  findAll() {
    return this.productCartItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCartItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCartItemDto: UpdateProductCartItemDto) {
    return this.productCartItemService.update(+id, updateProductCartItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCartItemService.remove(+id);
  }
}
