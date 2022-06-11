import { Service } from 'src/service/entities/service.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  phoneNumber: string;

  @Column()
  reserveDate: Date;

  @JoinColumn()
  @ManyToOne(() => Service, { cascade: true })
  service: Service;
}
