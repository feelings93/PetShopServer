import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceService } from 'src/service/service.service';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
    private servicesService: ServiceService,
  ) {}
  async create(createReservationDto: CreateReservationDto) {
    const reservation = await this.reservationRepo.create(createReservationDto);
    const service = await this.servicesService.findOne(
      createReservationDto.serviceId,
    );
    reservation.service = service;
    return this.reservationRepo.save(reservation);
  }

  findAll() {
    return this.reservationRepo.find({
      relations: ['service'],
    });
  }

  async findOne(id: number) {
    const reservation = await this.reservationRepo.findOne(id, {
      relations: ['service'],
    });
    if (!reservation) {
      throw new NotFoundException('Không tìm thấy lịch hẹn này');
    }
    return reservation;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
