import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsIn(['Online', 'Offline'])
  orderType: string;

  @ApiProperty()
  @IsString()
  @IsIn(['Thanh toán khi nhận hàng', 'Chuyển khoản'])
  paymentType: string;

  @ApiProperty()
  @IsString()
  customerName: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  province: string;

  @ApiProperty()
  @IsString()
  district: string;

  @ApiProperty()
  @IsString()
  commune: string;

  @ApiProperty()
  @IsString()
  detailAddress: string;

  @ApiProperty()
  @IsString()
  note: string;

  @ApiProperty()
  @IsArray()
  services: { id: number; doneBy: number }[];

  @ApiProperty()
  @IsArray()
  pets: { id: number }[];

  @ApiProperty()
  @IsArray()
  products: { id: number; quantity: number }[];
}
