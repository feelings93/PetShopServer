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
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { BreedModule } from './breed/breed.module';
import { CategoryModule } from './category/category.module';
import { EmployeeModule } from './employee/employee.module';
import { OrderModule } from './order/order.module';
import { PetModule } from './pet/pet.module';
import { PetCartItemModule } from './pet-cart-item/pet-cart-item.module';
import { PetOrderItemModule } from './pet-order-item/pet-order-item.module';
import { PetPhotoModule } from './pet-photo/pet-photo.module';
import { PetTypeModule } from './pet-type/pet-type.module';
import { ProductModule } from './product/product.module';
import { ProductCartItemModule } from './product-cart-item/product-cart-item.module';
import { ProductOrderItemModule } from './product-order-item/product-order-item.module';
import { ProductPhotoModule } from './product-photo/product-photo.module';
import { ServiceModule } from './service/service.module';
import { ServiceOrderItemModule } from './service-order-item/service-order-item.module';
import { ServicePhotoModule } from './service-photo/service-photo.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { Breed } from './breed/entities/breed.entity';
import { Cart } from './cart/entities/cart.entity';
import { Category } from './category/entities/category.entity';
import { Employee } from './employee/entities/employee.entity';
import { EmployeeToService } from './employee-to-service/entities/employee-to-service.entity';
import { Order } from './order/entities/order.entity';
import { Pet } from './pet/entities/pet.entity';
import { PetCartItem } from './pet-cart-item/entities/pet-cart-item.entity';
import { PetOrderItem } from './pet-order-item/entities/pet-order-item.entity';
import { PetPhoto } from './pet-photo/entities/pet-photo.entity';
import { PetType } from './pet-type/entities/pet-type.entity';
import { Product } from './product/entities/product.entity';
import { ProductCartItem } from './product-cart-item/entities/product-cart-item.entity';
import { ProductOrderItem } from './product-order-item/entities/product-order-item.entity';
import { ProductPhoto } from './product-photo/entities/product-photo.entity';
import { Service } from './service/entities/service.entity';
import { ServiceOrderItem } from './service-order-item/entities/service-order-item.entity';
import { ServicePhoto } from './service-photo/entities/service-photo.entity';
import { SubCategory } from './sub-category/entities/sub-category.entity';
import { AdminUserModule } from './admin-user/admin-user.module';
import { AdminUser } from './admin-user/entities/admin-user.entity';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { CustomerAuthModule } from './customer-auth/customer-auth.module';
import { ReservationsModule } from './reservations/reservations.module';
import { Reservation } from './reservations/entities/reservation.entity';

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
        entities: [
          Address,
          AdminUser,
          Breed,
          Cart,
          Category,
          Customer,
          Employee,
          EmployeeToService,
          Order,
          Pet,
          PetCartItem,
          PetOrderItem,
          PetPhoto,
          PetType,
          Product,
          ProductCartItem,
          ProductOrderItem,
          ProductPhoto,
          Reservation,
          Service,
          ServiceOrderItem,
          ServicePhoto,
          SubCategory,
        ],
        synchronize: true,
      }),
    }),
    AddressModule,
    AdminAuthModule,
    AdminUserModule,
    AuthModule,
    BreedModule,
    CartModule,
    CategoryModule,
    CustomerModule,
    CustomerAuthModule,
    EmployeeModule,
    EmployeeToServiceModule,
    OrderModule,
    PetModule,
    PetCartItemModule,
    PetOrderItemModule,
    PetPhotoModule,
    PetTypeModule,
    ProductModule,
    ProductCartItemModule,
    ProductOrderItemModule,
    ProductPhotoModule,
    ServiceModule,
    ServiceOrderItemModule,
    ServicePhotoModule,
    SubCategoryModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
