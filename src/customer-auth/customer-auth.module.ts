import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CustomerModule } from 'src/customer/customer.module';
import { CustomerAuthController } from './customer-auth.controller';
import { CustomerAuthService } from './customer-auth.service';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  providers: [CustomerAuthService, LocalStrategy],
  imports: [
    CustomerModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '10h' },
      }),
    }),
  ],
  controllers: [CustomerAuthController],
})
export class CustomerAuthModule {}
