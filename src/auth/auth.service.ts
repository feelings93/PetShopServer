import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  async validateUser(email: string, pass: string) {
    // if (!pass) return null;
    // const user = await this.usersService.findByEmail(email);
    // if (user && (await bcrypt.compare(pass, user.password))) {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const { password, ...result } = user;

    //   return result;
    // }
    return null;
  }

  // async login(user: any) {
  //   const payload = { email: user.email, sub: user.id, role: user.role };
  //   return {
  //     accessToken: this.jwtService.sign(payload),
  //   };
  // }

  // async googleLogin(tokenId: string) {
  //   const obsRes = this.httpService.get(
  //     `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`,
  //   );
  //   try {
  //     const response = await firstValueFrom(obsRes);
  //     const { email, picture, name } = response.data;
  //     let user = await this.usersService.findByEmail(email);
  //     if (!user) {
  //       user = await this.signupForGoogle({ email, avatarUrl: picture, name });
  //     }
  //     return this.login(user);
  //   } catch (err) {
  //     throw new UnauthorizedException();
  //   }
  // }

  // async signup(createUserDto: CreateUserDto) {
  //   const user = await this.usersService.findByEmail(createUserDto.email);
  //   if (user) {
  //     throw new BadRequestException('User with this email has existed');
  //   }

  //   const saltRounds = 10;
  //   createUserDto.password = await bcrypt.hash(
  //     createUserDto.password,
  //     saltRounds,
  //   );
  //   const newUser = await this.usersService.create(createUserDto);
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   return this.login(newUser);
  // }

  // async findOne(id: number, withCart = false) {
  //   return this.usersService.findOne(id, withCart);
  // }

  // async signupForGoogle(googleSignUpUserDto: GoogleSignUpUserDto) {
  //   return this.usersService.createForGoogle(googleSignUpUserDto);
  // }
  // getCart(id: number) {
  //   return this.usersService.getCart(id);
  // }
  // async updateProfile(
  //   id: number,
  //   body: UpdateUserDto,
  //   file: Express.Multer.File,
  // ) {
  //   return this.usersService.update(id, body, file);
  // }

  // async changePassword(id: number, body: UpdateUserDto) {
  //   const user = await this.usersService.findOne(id);
  //   if (!user || !(await bcrypt.compare(body.oldPassword, user.password))) {
  //     throw new BadRequestException('Password incorrect');
  //   }
  //   const saltRounds = 10;
  //   body.password = await bcrypt.hash(body.password, saltRounds);
  //   return this.usersService.update(id, body, null);
  // }
}
