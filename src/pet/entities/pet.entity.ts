import { Breed } from 'src/breed/entities/breed.entity';
import { PetCartItem } from 'src/pet-cart-item/entities/pet-cart-item.entity';
import { PetOrderItem } from 'src/pet-order-item/entities/pet-order-item.entity';
import { PetPhoto } from 'src/pet-photo/entities/pet-photo.entity';
import { PetType } from 'src/pet-type/entities/pet-type.entity';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  price: number;

  @Column({ default: 'Còn hàng' })
  status: string;

  @Column()
  describe: string;

  @OneToMany(() => PetPhoto, (photo) => photo.pet, { cascade: true })
  photos: PetPhoto[];

  @ManyToOne(() => PetType, (type) => type.pets)
  type: PetType;

  @ManyToOne(() => Breed, (breed) => breed.pets)
  breed: Breed;

  @OneToMany(() => PetOrderItem, (petOrderItem) => petOrderItem.pet)
  petOrderItems: PetOrderItem[];

  @OneToMany(() => PetCartItem, (petCartItem) => petCartItem.pet)
  petCartItems: PetCartItem[];
}
