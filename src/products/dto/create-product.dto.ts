import { IsString } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  status: string;

  categories: Category[];

  selectedCategories: string[];

  price: number;

  quantity: number;
}
