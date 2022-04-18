import { Module } from '@nestjs/common';
import { ServiceOrderItemService } from './service-order-item.service';
import { ServiceOrderItemController } from './service-order-item.controller';

@Module({
  controllers: [ServiceOrderItemController],
  providers: [ServiceOrderItemService]
})
export class ServiceOrderItemModule {}
