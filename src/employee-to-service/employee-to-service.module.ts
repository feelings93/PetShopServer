import { Module } from '@nestjs/common';
import { EmployeeToServiceService } from './employee-to-service.service';
import { EmployeeToServiceController } from './employee-to-service.controller';

@Module({
  controllers: [EmployeeToServiceController],
  providers: [EmployeeToServiceService]
})
export class EmployeeToServiceModule {}
