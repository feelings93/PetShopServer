import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  password?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsIn(['Nam', 'Nữ'])
  gender: string;

  @IsString()
  phone: string;
}
