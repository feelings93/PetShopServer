import { Cart } from 'src/cart/entities/cart.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  avatarUrl: string;

  @Column()
  city: string;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
