import { Order } from 'src/order/entities/order.entity';
import { Pet } from 'src/pet/entities/pet.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PetOrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.petOrderItems)
  order: Order;

  @ManyToOne(() => Pet, (pet) => pet.petOrderItems)
  pet: Pet;
}
