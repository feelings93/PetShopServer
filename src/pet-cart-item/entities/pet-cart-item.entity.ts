import { Cart } from 'src/cart/entities/cart.entity';
import { Pet } from 'src/pet/entities/pet.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PetCartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Pet, (pet) => pet.petCartItems)
  pet: Pet;

  @ManyToOne(() => Cart, (cart) => cart.petCartItems)
  cart: Cart;
}
