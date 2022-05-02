import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUser } from './entities/admin-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepo: Repository<AdminUser>,
  ) {}
  async create(createAdminUserDto: CreateAdminUserDto) {
    const saltRounds = 10;
    createAdminUserDto.password = bcrypt.hashSync(
      createAdminUserDto.password,
      saltRounds,
    );
    const adminUser = await this.adminUserRepo.create(createAdminUserDto);
    return this.adminUserRepo.save(adminUser);
  }

  findAll() {
    return this.adminUserRepo.find();
  }

  async findOne(id: number) {
    const adminUser = await this.adminUserRepo.findOne(id);
    if (!adminUser) {
      throw new NotFoundException('AdminUser not found!');
    }
    return adminUser;
  }

  async findOneByEmail(email: string) {
    const adminUser = await this.adminUserRepo.findOne({ email: email });
    if (!adminUser) {
      throw new NotFoundException('AdminUser not found!');
    }
    return adminUser;
  }

  async update(id: number, updateAdminUserDto: UpdateAdminUserDto) {
    const saltRounds = 10;
    const adminUser = await this.findOne(id);
    adminUser.firstName = updateAdminUserDto?.firstName || adminUser.firstName;
    adminUser.lastName = updateAdminUserDto?.lastName || adminUser.lastName;
    adminUser.phone = updateAdminUserDto?.phone || adminUser.phone;
    adminUser.password = updateAdminUserDto?.password
      ? bcrypt.hashSync(updateAdminUserDto.password, saltRounds)
      : adminUser.password;
    adminUser.role = updateAdminUserDto?.role || adminUser.role;
    if (typeof updateAdminUserDto?.actived === 'boolean')
      adminUser.actived = updateAdminUserDto?.actived;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.adminUserRepo.save(adminUser);
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} adminUser`;
  }
}
