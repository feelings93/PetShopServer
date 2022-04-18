import { Injectable } from '@nestjs/common';
import { CreateEmployeeToServiceDto } from './dto/create-employee-to-service.dto';
import { UpdateEmployeeToServiceDto } from './dto/update-employee-to-service.dto';

@Injectable()
export class EmployeeToServiceService {
  create(createEmployeeToServiceDto: CreateEmployeeToServiceDto) {
    return 'This action adds a new employeeToService';
  }

  findAll() {
    return `This action returns all employeeToService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeToService`;
  }

  update(id: number, updateEmployeeToServiceDto: UpdateEmployeeToServiceDto) {
    return `This action updates a #${id} employeeToService`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeToService`;
  }
}
