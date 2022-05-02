import { Module } from '@nestjs/common';
import { ServiceOrderItemService } from './service-order-item.service';
import { ServiceOrderItemController } from './service-order-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceOrderItem } from './entities/service-order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceOrderItem])],
  controllers: [ServiceOrderItemController],
  providers: [ServiceOrderItemService],
  exports: [ServiceOrderItemService],
})
export class ServiceOrderItemModule {}
