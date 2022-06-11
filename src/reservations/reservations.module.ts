import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ServiceModule } from 'src/service/service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';

@Module({
  controllers: [ReservationsController],
  imports: [ServiceModule, TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationsService],
})
export class ReservationsModule {}
