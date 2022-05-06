import { Address } from 'src/address/entities/address.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: true })
  actived: boolean;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToOne(() => Address)
  @JoinColumn()
  defaultAddress: Address;

  @OneToMany(() => Address, (address) => address.customer)
  addresses: Address[];

  @JoinColumn()
  @OneToOne(() => Cart, { cascade: true })
  cart: Cart;
}
