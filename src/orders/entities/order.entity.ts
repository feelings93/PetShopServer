import { Product } from 'src/products/entities/product.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable()
  products: Product[];
}
