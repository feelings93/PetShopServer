import { IsArray, IsIn, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  products: { productId: number; quantity: number }[];

  @IsIn(['Thanh toán khi nhận hàng', 'Chuyển khoản'])
  paymentType: string;

  @IsString()
  province: string;

  @IsString()
  district: string;

  @IsString()
  customerName: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  note: string;
}
