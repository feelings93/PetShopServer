import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  @IsString()
  describe: string;

  @ApiProperty({ type: 'array' })
  //   @IsArray()
  employeeIds: any[];

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}
