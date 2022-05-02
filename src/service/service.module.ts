import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { EmployeeModule } from 'src/employee/employee.module';
import { ServicePhotoModule } from 'src/service-photo/service-photo.module';
import { EmployeeToServiceModule } from 'src/employee-to-service/employee-to-service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    EmployeeModule,
    ServicePhotoModule,
    EmployeeToServiceModule,
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
