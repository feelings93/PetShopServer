import { PartialType } from '@nestjs/mapped-types';
import { CreatePetOrderItemDto } from './create-pet-order-item.dto';

export class UpdatePetOrderItemDto extends PartialType(CreatePetOrderItemDto) {}
