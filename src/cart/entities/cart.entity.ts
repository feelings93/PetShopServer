import { PetCartItem } from 'src/pet-cart-item/entities/pet-cart-item.entity';
import { ProductCartItem } from 'src/product-cart-item/entities/product-cart-item.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProductCartItem, (productCartItem) => productCartItem.cart)
  productCartItems: ProductCartItem[];

  @OneToMany(() => PetCartItem, (petCartItem) => petCartItem.cart)
  petCartItems: PetCartItem[];
}
