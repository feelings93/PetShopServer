import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceOrderItemService } from './service-order-item.service';
import { CreateServiceOrderItemDto } from './dto/create-service-order-item.dto';
import { UpdateServiceOrderItemDto } from './dto/update-service-order-item.dto';

@Controller('service-order-item')
export class ServiceOrderItemController {
  constructor(private readonly serviceOrderItemService: ServiceOrderItemService) {}

  @Post()
  create(@Body() createServiceOrderItemDto: CreateServiceOrderItemDto) {
    return this.serviceOrderItemService.create(createServiceOrderItemDto);
  }

  @Get()
  findAll() {
    return this.serviceOrderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceOrderItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceOrderItemDto: UpdateServiceOrderItemDto) {
    return this.serviceOrderItemService.update(+id, updateServiceOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceOrderItemService.remove(+id);
  }
}
