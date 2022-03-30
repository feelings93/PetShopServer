import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Patch,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Post('google-login')
  async googleLogin(@Body('tokenId') tokenId: string) {
    return this.authService.googleLogin(tokenId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return this.authService.findOne(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @UseInterceptors(FileInterceptor('file'))
  async updateProfile(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateUserDto,
  ) {
    return this.authService.updateProfile(req.user.userId, body, file);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async changePassword(@Req() req, @Body() body: UpdateUserDto) {
    return this.authService.changePassword(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('cart')
  async getCart(@Req() req) {
    const user = await this.authService.findOne(req.user.userId, true);
    if (!user.cart) {
      throw new NotFoundException('Cart not found');
    }
    return user.cart;
  }
}
