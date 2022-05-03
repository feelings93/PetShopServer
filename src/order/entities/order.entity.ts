import { Customer } from 'src/customer/entities/customer.entity';
import { PetOrderItem } from 'src/pet-order-item/entities/pet-order-item.entity';
import { ProductOrderItem } from 'src/product-order-item/entities/product-order-item.entity';
import { ServiceOrderItem } from 'src/service-order-item/entities/service-order-item.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Chờ xử lý' })
  status: string;

  @Column()
  total: number;

  @Column()
  shipCost: number;

  @Column()
  orderType: string;

  @Column()
  paymentType: string;

  @Column({ default: 'Chưa thanh toán' })
  paymentStatus: string;

  @Column()
  customerName: string;

  @Column()
  phone: string;

  @Column()
  province: string;

  @Column()
  district: string;

  @Column()
  commune: string;

  @Column()
  detailAddress: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column()
  note: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;
  @OneToMany(
    () => ServiceOrderItem,
    (serviceOrderItem) => serviceOrderItem.order,
    { cascade: true },
  )
  serviceOrderItems: ServiceOrderItem[];

  @OneToMany(() => PetOrderItem, (petOrderItem) => petOrderItem.order, {
    cascade: true,
  })
  petOrderItems: PetOrderItem[];

  @OneToMany(
    () => ProductOrderItem,
    (productOrderItem) => productOrderItem.order,
    { cascade: true },
  )
  productOrderItems: ProductOrderItem[];
}
