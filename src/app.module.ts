import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CustomerModule } from './customer/customer.module';
import { AddressModule } from './address/address.module';
import { Address } from './address/entities/address.entity';
import { Customer } from './customer/entities/customer.entity';
import { EmployeeToServiceModule } from './employee-to-service/employee-to-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        database: configService.get('DATABASE_NAME'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        port: configService.get('DATABASE_PORT'),
        entities: [Address, Customer],
        synchronize: true,
      }),
    }),

    CustomerModule,
    AddressModule,
    EmployeeToServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
