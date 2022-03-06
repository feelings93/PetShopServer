import { IsEmail, IsString, IsUrl } from 'class-validator';

export class GoogleSignUpUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsUrl()
  avatarUrl: string;
}
