import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UploadedFiles,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { CreateEmployeeToServiceDto } from 'src/employee-to-service/dto/create-employee-to-service.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { CreateServicePhotoDto } from 'src/service-photo/dto/create-service-photo.dto';
import { storage } from 'src/utils/firebase-storage.utils';
import { Repository } from 'typeorm/repository/Repository';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
    private readonly employeeService: EmployeeService,
  ) {}
  async create(
    createServiceDto: CreateServiceDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    createServiceDto.employeeIds = JSON.parse(
      '[' + createServiceDto.employeeIds + ']',
    );
    if (!Array.isArray(createServiceDto.employeeIds))
      throw new BadRequestException('employeeIds must be array');
    for (let i = 0; i < createServiceDto.employeeIds.length; i++) {
      if (isNaN(+createServiceDto.employeeIds[i]))
        throw new BadRequestException('employeeId must be number');
    }
    if (isNaN(+createServiceDto.price))
      throw new BadRequestException('price must be number!');
    createServiceDto.price = +createServiceDto.price;
    const service = await this.serviceRepo.create(createServiceDto);

    // Add employee
    const employeeToServices = [];
    for (let i = 0; i < createServiceDto.employeeIds.length; i++) {
      await this.employeeService.findOne(+createServiceDto.employeeIds[i]);
      const createEmployeeToServiceDto = new CreateEmployeeToServiceDto();
      createEmployeeToServiceDto.serviceId = service.id;
      createEmployeeToServiceDto.employeeId = +createServiceDto.employeeIds[i];
      employeeToServices.push(createEmployeeToServiceDto);
    }
    service.employeeToServices = employeeToServices;
    // Upload images to firebase storage
    const photos = [];
    for (let i = 0; i < files.length; i++) {
      const createServicePhotoDto = new CreateServicePhotoDto();
      try {
        const storageRef = ref(
          storage,
          `images/services/${service.id}/` + files[i].originalname,
        );
        const snapshot = await uploadBytes(storageRef, files[i].buffer);
        createServicePhotoDto.url = await getDownloadURL(snapshot.ref);
        photos.push(createServicePhotoDto);
      } catch (error) {
        console.log(error);
        throw new BadRequestException();
      }
    }
    service.photos = photos;
    await this.serviceRepo.save(service);
    return this.findOne(service.id);
  }

  findAll() {
    return this.serviceRepo.find({
      relations: ['photos'],
      join: {
        alias: 'service',
        leftJoinAndSelect: {
          employeeToServices: 'service.employeeToServices',
          employee: 'employeeToServices.employee',
        },
      },
    });
  }

  async findOne(id: number) {
    const service = await this.serviceRepo.findOne(id, {
      relations: ['photos'],
      join: {
        alias: 'service',
        leftJoinAndSelect: {
          employeeToServices: 'service.employeeToServices',
          employee: 'employeeToServices.employee',
        },
      },
    });
    if (!service) throw new NotFoundException('Service not found!');
    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
