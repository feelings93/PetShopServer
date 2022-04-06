import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  customerName: string;

  @Column()
  paymentType: string;

  @Column()
  dateOrder: Date;

  @Column()
  province: string;

  @Column()
  district: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ default: 'Chờ xử lý' })
  status: string;

  @Column()
  note: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
