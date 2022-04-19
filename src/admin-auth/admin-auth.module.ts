import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminUserModule } from 'src/admin-user/admin-user.module';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  providers: [AdminAuthService, LocalStrategy],
  imports: [
    AdminUserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '10h' },
      }),
    }),
  ],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
