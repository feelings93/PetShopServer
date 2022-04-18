import { PartialType } from '@nestjs/mapped-types';
import { CreateProductPhotoDto } from './create-product-photo.dto';

export class UpdateProductPhotoDto extends PartialType(CreateProductPhotoDto) {}
