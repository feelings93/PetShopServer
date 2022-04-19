import { EmployeeToService } from 'src/employee-to-service/entities/employee-to-service.entity';
import { ServiceOrderItem } from 'src/service-order-item/entities/service-order-item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  gender: string;

  @OneToMany(
    () => EmployeeToService,
    (employeeToService) => employeeToService.employee,
  )
  employeeToServices: EmployeeToService[];

  @OneToMany(
    () => ServiceOrderItem,
    (serviceOrderItem) => serviceOrderItem.doneBy,
  )
  serviceOrderItems: ServiceOrderItem[];
}
