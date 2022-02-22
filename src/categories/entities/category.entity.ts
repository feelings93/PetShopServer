import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Category, (category) => category.parent)
  parent: Category;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable()
  products: Product[];
}
