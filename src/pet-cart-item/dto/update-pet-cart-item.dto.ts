import { PartialType } from '@nestjs/mapped-types';
import { CreatePetCartItemDto } from './create-pet-cart-item.dto';

export class UpdatePetCartItemDto extends PartialType(CreatePetCartItemDto) {}
