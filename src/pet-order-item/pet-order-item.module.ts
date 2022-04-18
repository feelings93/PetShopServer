import { Module } from '@nestjs/common';
import { PetOrderItemService } from './pet-order-item.service';
import { PetOrderItemController } from './pet-order-item.controller';

@Module({
  controllers: [PetOrderItemController],
  providers: [PetOrderItemService]
})
export class PetOrderItemModule {}
