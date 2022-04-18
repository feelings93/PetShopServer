import { Module } from '@nestjs/common';
import { ProductOrderItemService } from './product-order-item.service';
import { ProductOrderItemController } from './product-order-item.controller';

@Module({
  controllers: [ProductOrderItemController],
  providers: [ProductOrderItemService]
})
export class ProductOrderItemModule {}
