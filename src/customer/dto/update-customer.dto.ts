import { PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsNumber()
  @IsOptional()
  defaultAddressId?: number;

  @IsArray()
  @IsOptional()
  addressesId?: number[];

  @IsOptional()
  @IsBoolean()
  actived?: boolean;

  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  @IsOptional()
  @IsString()
  oldPassword?: string;
}
