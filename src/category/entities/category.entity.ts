import { Product } from 'src/product/entities/product.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => SubCategory, (sub) => sub.category)
  subCategories: SubCategory[];
}
