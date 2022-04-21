import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePetDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  @IsString()
  describe: string;

  @ApiProperty()
  typeId: number;

  @ApiProperty()
  breedId: number;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}
