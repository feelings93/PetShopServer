import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetCartItemService } from './pet-cart-item.service';
import { CreatePetCartItemDto } from './dto/create-pet-cart-item.dto';
import { UpdatePetCartItemDto } from './dto/update-pet-cart-item.dto';

@Controller('pet-cart-item')
export class PetCartItemController {
  constructor(private readonly petCartItemService: PetCartItemService) {}

  @Post()
  create(@Body() createPetCartItemDto: CreatePetCartItemDto) {
    return this.petCartItemService.create(createPetCartItemDto);
  }

  @Get()
  findAll() {
    return this.petCartItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petCartItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetCartItemDto: UpdatePetCartItemDto) {
    return this.petCartItemService.update(+id, updatePetCartItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petCartItemService.remove(+id);
  }
}
