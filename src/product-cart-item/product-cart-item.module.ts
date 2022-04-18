import { Module } from '@nestjs/common';
import { ProductCartItemService } from './product-cart-item.service';
import { ProductCartItemController } from './product-cart-item.controller';

@Module({
  controllers: [ProductCartItemController],
  providers: [ProductCartItemService]
})
export class ProductCartItemModule {}
