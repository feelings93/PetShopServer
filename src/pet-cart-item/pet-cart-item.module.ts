import { Module } from '@nestjs/common';
import { PetCartItemService } from './pet-cart-item.service';
import { PetCartItemController } from './pet-cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetCartItem } from './entities/pet-cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetCartItem])],
  controllers: [PetCartItemController],
  providers: [PetCartItemService],
  exports: [PetCartItemService],
})
export class PetCartItemModule {}
