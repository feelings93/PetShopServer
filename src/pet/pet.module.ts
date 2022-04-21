import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { PetTypeModule } from 'src/pet-type/pet-type.module';
import { BreedModule } from 'src/breed/breed.module';
import { PetPhotoModule } from 'src/pet-photo/pet-photo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet]),
    PetTypeModule,
    BreedModule,
    PetPhotoModule,
  ],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
