import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsIn([
    'Chờ xử lý',
    'Đã xác nhận',
    'Đang giao hàng',
    'Đã giao',
    'Đã hủy',
    'Đã hoàn thành',
  ])
  status?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(['Chưa thanh toán', 'Đã thanh toán'])
  paymentStatus?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  shipCost?: number;
}
