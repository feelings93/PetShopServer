import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateAdminUserDto } from 'src/admin-user/dto/update-admin-user.dto';
import { AdminAuthService } from './admin-auth.service';
import { LoginUser } from './dto/login-user.dto';
import { JwtAuthGuard } from './guard/jwt-auth';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiBearerAuth()
@Controller('admin-auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() req, @Body() _loginUser: LoginUser) {
    return this.adminAuthService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Request() req, @Body() body: UpdateAdminUserDto) {
    return this.adminAuthService.updateProfile(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  changePassword(@Request() req, @Body() body: UpdateAdminUserDto) {
    return this.adminAuthService.changePassword(req.user.userId, body);
  }
}
