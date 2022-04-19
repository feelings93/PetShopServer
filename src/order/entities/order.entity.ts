import { PetOrderItem } from 'src/pet-order-item/entities/pet-order-item.entity';
import { ProductOrderItem } from 'src/product-order-item/entities/product-order-item.entity';
import { ServiceOrderItem } from 'src/service-order-item/entities/service-order-item.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => ServiceOrderItem,
    (serviceOrderItem) => serviceOrderItem.order,
  )
  serviceOrderItems: ServiceOrderItem[];

  @OneToMany(() => PetOrderItem, (petOrderItem) => petOrderItem.order)
  petOrderItems: PetOrderItem[];

  @OneToMany(
    () => ProductOrderItem,
    (productOrderItem) => productOrderItem.order,
  )
  productOrderItems: ProductOrderItem[];
}
