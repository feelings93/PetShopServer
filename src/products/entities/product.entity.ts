import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { Category } from 'src/categories/entities/category.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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
  status: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  describe: string;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => CartItem, (cart) => cart.product)
  cartItems: CartItem[];

  @OneToMany(() => Photo, (photo) => photo.product)
  photos: Photo[];
}
