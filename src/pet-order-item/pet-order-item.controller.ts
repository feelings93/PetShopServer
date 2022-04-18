import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetOrderItemService } from './pet-order-item.service';
import { CreatePetOrderItemDto } from './dto/create-pet-order-item.dto';
import { UpdatePetOrderItemDto } from './dto/update-pet-order-item.dto';

@Controller('pet-order-item')
export class PetOrderItemController {
  constructor(private readonly petOrderItemService: PetOrderItemService) {}

  @Post()
  create(@Body() createPetOrderItemDto: CreatePetOrderItemDto) {
    return this.petOrderItemService.create(createPetOrderItemDto);
  }

  @Get()
  findAll() {
    return this.petOrderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petOrderItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetOrderItemDto: UpdatePetOrderItemDto) {
    return this.petOrderItemService.update(+id, updatePetOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petOrderItemService.remove(+id);
  }
}
