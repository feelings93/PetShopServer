import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty()
  @IsString()
  @IsIn([
    'Chờ xử lý',
    'Đã xác nhận',
    'Đang giao hàng',
    'Đã giao',
    'Đã hủy',
    'Đã hoàn thành',
  ])
  status: string;

  @ApiProperty()
  @IsString()
  @IsIn(['Chưa thanh toán', 'Đã thanh toán'])
  paymentStatus: string;

  @ApiProperty()
  @IsNumber()
  shipCost: number;
}
