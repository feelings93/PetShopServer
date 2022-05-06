import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateCustomerDto } from 'src/customer/dto/update-customer.dto';
import { CustomerAuthService } from './customer-auth.service';
import { LoginUser } from './dto/login-user.dto';
import { RegisterUser } from './dto/register-user.dto';
import { JwtAuthGuard } from './guard/jwt-auth';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiBearerAuth()
@ApiTags('customer-auth')
@Controller('customer-auth')
export class CustomerAuthController {
  constructor(private customerAuthService: CustomerAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() req, @Body() _loginUser: LoginUser) {
    return this.customerAuthService.login(req.user);
  }

  @Post('/register')
  async register(@Request() req, @Body() _registerUser: RegisterUser) {
    return this.customerAuthService.register(_registerUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.customerAuthService.getProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Request() req, @Body() body: UpdateCustomerDto) {
    return this.customerAuthService.updateProfile(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  changePassword(@Request() req, @Body() body: UpdateCustomerDto) {
    return this.customerAuthService.changePassword(req.user.userId, body);
  }
}
