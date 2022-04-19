import { Employee } from 'src/employee/entities/employee.entity';
import { Order } from 'src/order/entities/order.entity';
import { Service } from 'src/service/entities/service.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ServiceOrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Service, (service) => service.serviceOrderItems)
  service: Service;

  @ManyToOne(() => Order, (order) => order.serviceOrderItems)
  order: Order;

  @ManyToOne(() => Employee, (employee) => employee.serviceOrderItems)
  doneBy: Employee;
}
