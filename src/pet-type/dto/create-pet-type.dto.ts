import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreatePetTypeDto {
  @ApiProperty()
  @IsString()
  name: string;
}
