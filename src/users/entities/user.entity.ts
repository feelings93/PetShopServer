import { Cart } from 'src/cart/entities/cart.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: true })
  actived: boolean;

  @Column()
  name: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ nullable: true })
  city?: string;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
