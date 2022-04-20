import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepo.create(createEmployeeDto);
    await this.employeeRepo.save(employee);
    return this.findOne(employee.id);
  }

  findAll() {
    return this.employeeRepo.find({
      join: {
        alias: 'employee',
        leftJoinAndSelect: {
          employeeToServices: 'employee.employeeToServices',
          service: 'employeeToServices.service',
        },
      },
    });
  }

  async findOne(id: number) {
    const employee = await this.employeeRepo.findOne(id, {
      join: {
        alias: 'employee',
        leftJoinAndSelect: {
          employeeToServices: 'employee.employeeToServices',
          service: 'employeeToServices.service',
        },
      },
    });
    if (!employee) throw new NotFoundException('Employee not found!');
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let employee = await this.findOne(id);
    employee = { ...employee, ...updateEmployeeDto };
    return this.employeeRepo.save(employee);
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
