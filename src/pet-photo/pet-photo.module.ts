import { Module } from '@nestjs/common';
import { PetPhotoService } from './pet-photo.service';
import { PetPhotoController } from './pet-photo.controller';

@Module({
  controllers: [PetPhotoController],
  providers: [PetPhotoService]
})
export class PetPhotoModule {}
