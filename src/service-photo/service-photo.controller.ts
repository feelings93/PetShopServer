import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicePhotoService } from './service-photo.service';
import { CreateServicePhotoDto } from './dto/create-service-photo.dto';
import { UpdateServicePhotoDto } from './dto/update-service-photo.dto';

@Controller('service-photo')
export class ServicePhotoController {
  constructor(private readonly servicePhotoService: ServicePhotoService) {}

  @Post()
  create(@Body() createServicePhotoDto: CreateServicePhotoDto) {
    return this.servicePhotoService.create(createServicePhotoDto);
  }

  @Get()
  findAll() {
    return this.servicePhotoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicePhotoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicePhotoDto: UpdateServicePhotoDto) {
    return this.servicePhotoService.update(+id, updateServicePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicePhotoService.remove(+id);
  }
}
