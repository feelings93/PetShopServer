import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNumber } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsNumber()
  defaultAddressId: number;

  @IsArray()
  addressesId: number[];
}
