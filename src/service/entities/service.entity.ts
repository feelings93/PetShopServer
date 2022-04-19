import { EmployeeToService } from 'src/employee-to-service/entities/employee-to-service.entity';
import { ServiceOrderItem } from 'src/service-order-item/entities/service-order-item.entity';
import { ServicePhoto } from 'src/service-photo/entities/service-photo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  describe: string;

  @OneToMany(() => ServicePhoto, (servicePhoto) => servicePhoto.service, {
    cascade: true,
  })
  photos: ServicePhoto[];

  @OneToMany(
    () => EmployeeToService,
    (employeeToService) => employeeToService.service,
  )
  employeeToServices: EmployeeToService[];

  @OneToMany(
    () => ServiceOrderItem,
    (serviceOrderItem) => serviceOrderItem.service,
  )
  serviceOrderItems: ServiceOrderItem[];
}
