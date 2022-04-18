import { EmployeeToService } from 'src/employee-to-service/entities/employee-to-service.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @OneToMany(
    () => EmployeeToService,
    (employeeToService) => employeeToService.employee,
  )
  employeeToServices: EmployeeToService[];
}
