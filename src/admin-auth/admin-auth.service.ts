import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminUserService } from 'src/admin-user/admin-user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateAdminUserDto } from 'src/admin-user/dto/update-admin-user.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    private adminUserSerivce: AdminUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const adminUser = await this.adminUserSerivce.findOneByEmail(email);
    if (adminUser && (await bcrypt.compare(pass, adminUser.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = adminUser;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: await this.getProfile(user.id),
    };
  }
  async getProfile(id: number) {
    const user = await this.adminUserSerivce.findOne(id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async updateProfile(id: number, body: UpdateAdminUserDto) {
    return this.adminUserSerivce.update(id, body);
  }

  async changePassword(id: number, body: UpdateAdminUserDto) {
    const user = await this.adminUserSerivce.findOne(id);
    if (!user || !(await bcrypt.compare(body.oldPassword, user.password))) {
      throw new BadRequestException('Password incorrect');
    }
    return this.adminUserSerivce.update(id, body);
  }
}
