import { Module } from '@nestjs/common';
import { PetPhotoService } from './pet-photo.service';
import { PetPhotoController } from './pet-photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetPhoto } from './entities/pet-photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetPhoto])],
  controllers: [PetPhotoController],
  providers: [PetPhotoService],
})
export class PetPhotoModule {}
