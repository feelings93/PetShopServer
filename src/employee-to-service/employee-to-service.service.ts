import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeToServiceDto } from './dto/create-employee-to-service.dto';
import { UpdateEmployeeToServiceDto } from './dto/update-employee-to-service.dto';
import { EmployeeToService } from './entities/employee-to-service.entity';

@Injectable()
export class EmployeeToServiceService {
  constructor(
    @InjectRepository(EmployeeToService)
    private readonly etsRepo: Repository<EmployeeToService>,
  ) {}
  create(createEmployeeToServiceDto: CreateEmployeeToServiceDto) {
    return 'This action adds a new employeeToService';
  }

  findAll() {
    return `This action returns all employeeToService`;
  }

  async findOne(id: number) {
    const ets = await this.etsRepo.findOne(id);
    if (!ets) throw new NotFoundException('Ets not found!');
    return ets;
  }

  update(id: number, updateEmployeeToServiceDto: UpdateEmployeeToServiceDto) {
    return `This action updates a #${id} employeeToService`;
  }

  async remove(id: number) {
    const ets = await this.findOne(id);
    return this.etsRepo.remove(ets);
  }
}
