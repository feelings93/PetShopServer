import { Module } from '@nestjs/common';
import { PetCartItemService } from './pet-cart-item.service';
import { PetCartItemController } from './pet-cart-item.controller';

@Module({
  controllers: [PetCartItemController],
  providers: [PetCartItemService]
})
export class PetCartItemModule {}
