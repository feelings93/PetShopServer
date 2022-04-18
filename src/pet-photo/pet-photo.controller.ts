import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetPhotoService } from './pet-photo.service';
import { CreatePetPhotoDto } from './dto/create-pet-photo.dto';
import { UpdatePetPhotoDto } from './dto/update-pet-photo.dto';

@Controller('pet-photo')
export class PetPhotoController {
  constructor(private readonly petPhotoService: PetPhotoService) {}

  @Post()
  create(@Body() createPetPhotoDto: CreatePetPhotoDto) {
    return this.petPhotoService.create(createPetPhotoDto);
  }

  @Get()
  findAll() {
    return this.petPhotoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petPhotoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetPhotoDto: UpdatePetPhotoDto) {
    return this.petPhotoService.update(+id, updatePetPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petPhotoService.remove(+id);
  }
}
