import { Module } from '@nestjs/common';
import { EmployeeToServiceService } from './employee-to-service.service';
import { EmployeeToServiceController } from './employee-to-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeToService } from './entities/employee-to-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeToService])],
  controllers: [EmployeeToServiceController],
  providers: [EmployeeToServiceService],
  exports: [EmployeeToServiceService],
})
export class EmployeeToServiceModule {}
