import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateAdminUserDto } from './create-admin-user.dto';

export class UpdateAdminUserDto extends PartialType(CreateAdminUserDto) {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  actived?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  oldPassword?: string;
}
