import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  address: string;
}
