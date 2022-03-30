import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @MinLength(6)
  @IsString()
  @IsOptional()
  oldPassword: string;
}
