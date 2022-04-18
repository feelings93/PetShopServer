import { Module } from '@nestjs/common';
import { ServicePhotoService } from './service-photo.service';
import { ServicePhotoController } from './service-photo.controller';

@Module({
  controllers: [ServicePhotoController],
  providers: [ServicePhotoService]
})
export class ServicePhotoModule {}
