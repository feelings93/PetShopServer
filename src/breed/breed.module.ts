import { Module } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedController } from './breed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { PetTypeModule } from 'src/pet-type/pet-type.module';

@Module({
  imports: [TypeOrmModule.forFeature([Breed]), PetTypeModule],
  controllers: [BreedController],
  providers: [BreedService],
})
export class BreedModule {}
