import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  defaultAddressId?: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  addressesId?: number[];

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  actived?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  oldPassword?: string;
}
