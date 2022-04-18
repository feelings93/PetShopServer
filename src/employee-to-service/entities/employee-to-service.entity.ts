import { Employee } from 'src/employee/entities/employee.entity';
import { Service } from 'src/service/entities/service.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmployeeToService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceId: number;

  @Column()
  employeeId: number;

  @ManyToOne(() => Service, (service) => service.employeeToServices)
  service: Service;

  @ManyToOne(() => Employee, (employee) => employee.employeeToServices)
  employee: Employee;
}
