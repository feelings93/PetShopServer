import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateProductOrderItemDto {
  @ApiProperty()
  @IsNumber()
  quantity: number;
}
