import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeToServiceDto } from './create-employee-to-service.dto';

export class UpdateEmployeeToServiceDto extends PartialType(CreateEmployeeToServiceDto) {}
