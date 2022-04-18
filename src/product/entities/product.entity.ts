import { Category } from 'src/category/entities/category.entity';
import { ProductPhoto } from 'src/product-photo/entities/product-photo.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  describe: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => SubCategory, (sub) => sub.products)
  subCategory: SubCategory;

  @OneToMany(() => ProductPhoto, (photo) => photo.product)
  photos: ProductPhoto[];
}
