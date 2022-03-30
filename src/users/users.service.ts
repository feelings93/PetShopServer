import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Cart } from '../cart/entities/cart.entity';
import { CartService } from 'src/cart/cart.service';
import { GoogleSignUpUserDto } from './dto/google-signup-user.dto';
const firebaseConfig = {
  apiKey: 'AIzaSyCw47amc5lpIeGeAH1r5LIPs-XK8mBxCuU',
  authDomain: 'doan1-343302.firebaseapp.com',
  projectId: 'doan1-343302',
  storageBucket: 'doan1-343302.appspot.com',
  messagingSenderId: '268766015201',
  appId: '1:268766015201:web:dc52ee966d2c9c76ce51a0',
  measurementId: 'G-7JJDE7Q10M',
};
const firebaseapp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseapp);
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private cartService: CartService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepo.create(createUserDto);
    const cart = await this.cartService.create(new Cart());
    user.cart = cart;
    return this.usersRepo.save(user);
  }

  async createForGoogle(googleSignUpUserDto: GoogleSignUpUserDto) {
    const user = await this.usersRepo.create(googleSignUpUserDto);
    const cart = await this.cartService.create(new Cart());
    user.cart = cart;
    return this.usersRepo.save(user);
  }

  findAll() {
    return this.usersRepo.find();
  }

  findOne(id: number, withCart = false) {
    return this.usersRepo.findOne(id, { relations: withCart ? ['cart'] : [] });
  }
  findByEmail(email: string) {
    return this.usersRepo.findOne({ email: email });
  }
  getCart(id: number) {
    return this.cartService.findOne(id);
  }
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    file: Express.Multer.File = null,
  ) {
    let user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    if (file) {
      try {
        const storageRef = ref(
          storage,
          `images/user/${user.id}` + file.originalname,
        );
        const snapshot = await uploadBytes(storageRef, file.buffer);
        user.avatarUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.log(error);
        throw new BadRequestException();
      }
    }
    user = { ...user, ...updateUserDto };
    return this.usersRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return this.usersRepo.remove(user);
  }
}
