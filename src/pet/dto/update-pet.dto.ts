import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { CreatePetDto } from './create-pet.dto';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @ApiProperty({ type: 'array' })
  @IsOptional()
  photoUrls?: any[];

  @ApiProperty()
  @IsString()
  @IsIn(['Còn hàng', 'Hết hàng'])
  @IsOptional()
  status: string;
}
