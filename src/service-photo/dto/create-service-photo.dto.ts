import { IsString } from 'class-validator';

export class CreateServicePhotoDto {
  @IsString()
  url: string;
}
