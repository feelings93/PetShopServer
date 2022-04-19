import { Module } from '@nestjs/common';
import { ProductCartItemService } from './product-cart-item.service';
import { ProductCartItemController } from './product-cart-item.controller';
import { ProductCartItem } from './entities/product-cart-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCartItem])],
  controllers: [ProductCartItemController],
  providers: [ProductCartItemService],
})
export class ProductCartItemModule {}
