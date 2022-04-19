import { Module } from '@nestjs/common';
import { ProductOrderItemService } from './product-order-item.service';
import { ProductOrderItemController } from './product-order-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrderItem } from './entities/product-order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrderItem])],
  controllers: [ProductOrderItemController],
  providers: [ProductOrderItemService],
})
export class ProductOrderItemModule {}
