import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  status: string;

  @IsArray()
  photoUrls: string[];

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}
