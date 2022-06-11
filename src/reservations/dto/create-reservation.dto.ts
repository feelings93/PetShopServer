import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty()
  @IsString()
  customerName: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  reserveDate: Date;

  @ApiProperty()
  @IsNumber()
  serviceId: number;
}
