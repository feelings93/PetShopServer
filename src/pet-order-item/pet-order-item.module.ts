import { Module } from '@nestjs/common';
import { PetOrderItemService } from './pet-order-item.service';
import { PetOrderItemController } from './pet-order-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetOrderItem } from './entities/pet-order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetOrderItem])],
  controllers: [PetOrderItemController],
  providers: [PetOrderItemService],
  exports: [PetOrderItemService],
})
export class PetOrderItemModule {}
