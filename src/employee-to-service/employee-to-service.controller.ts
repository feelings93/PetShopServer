import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeToServiceService } from './employee-to-service.service';
import { CreateEmployeeToServiceDto } from './dto/create-employee-to-service.dto';
import { UpdateEmployeeToServiceDto } from './dto/update-employee-to-service.dto';

@Controller('employee-to-service')
export class EmployeeToServiceController {
  constructor(private readonly employeeToServiceService: EmployeeToServiceService) {}

  @Post()
  create(@Body() createEmployeeToServiceDto: CreateEmployeeToServiceDto) {
    return this.employeeToServiceService.create(createEmployeeToServiceDto);
  }

  @Get()
  findAll() {
    return this.employeeToServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeToServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeToServiceDto: UpdateEmployeeToServiceDto) {
    return this.employeeToServiceService.update(+id, updateEmployeeToServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeToServiceService.remove(+id);
  }
}
