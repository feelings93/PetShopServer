import { Category } from 'src/categories/entities/category.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];
}
