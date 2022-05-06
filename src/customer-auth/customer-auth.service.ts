import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CustomerService } from 'src/customer/customer.service';
import { UpdateCustomerDto } from 'src/customer/dto/update-customer.dto';
import { RegisterUser } from './dto/register-user.dto';

@Injectable()
export class CustomerAuthService {
  constructor(
    private customerUserSerivce: CustomerService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const adminUser = await this.customerUserSerivce.findOneByEmail(email);
    if (adminUser && (await bcrypt.compare(pass, adminUser.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = adminUser;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: await this.getProfile(user.id),
    };
  }

  async register(user: RegisterUser) {
    let customer = await this.customerUserSerivce.findOneByEmail(user.email);
    if (customer) {
      if (customer.orders.length > 0)
        throw new BadRequestException('User with this email has been existed!');
      else {
        this.customerUserSerivce.update(customer.id, user);
      }
    } else {
      customer = await this.customerUserSerivce.create(user);
    }
    return this.login(customer);
  }

  async getProfile(id: number) {
    const user = await this.customerUserSerivce.findOne(id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async updateProfile(id: number, body: UpdateCustomerDto) {
    return this.customerUserSerivce.update(id, body);
  }

  async changePassword(id: number, body: UpdateCustomerDto) {
    const user = await this.customerUserSerivce.findOne(id);
    if (!user || !(await bcrypt.compare(body.oldPassword, user.password))) {
      throw new BadRequestException('Password incorrect');
    }
    return this.customerUserSerivce.update(id, body);
  }
}
