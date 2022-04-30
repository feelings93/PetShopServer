import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UploadedFiles,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { CreateEmployeeToServiceDto } from 'src/employee-to-service/dto/create-employee-to-service.dto';
import { EmployeeToServiceService } from 'src/employee-to-service/employee-to-service.service';
import { EmployeeService } from 'src/employee/employee.service';
import { CreateServicePhotoDto } from 'src/service-photo/dto/create-service-photo.dto';
import { ServicePhotoService } from 'src/service-photo/service-photo.service';
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
    private readonly servicePhotoService: ServicePhotoService,
    private readonly etsService: EmployeeToServiceService,
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

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
    files: Array<Express.Multer.File>,
  ) {
    // Validate
    if (updateServiceDto.employeeIds)
      updateServiceDto.employeeIds = JSON.parse(
        '[' + updateServiceDto.employeeIds + ']',
      );
    else updateServiceDto.employeeIds = [];

    if (!Array.isArray(updateServiceDto.employeeIds))
      throw new BadRequestException('employeeIds must be array');
    for (let i = 0; i < updateServiceDto.employeeIds.length; i++) {
      if (isNaN(+updateServiceDto.employeeIds[i]))
        throw new BadRequestException('employeeId must be number');
    }
    if (updateServiceDto.price && isNaN(+updateServiceDto.price))
      throw new BadRequestException('price must be number!');

    if (updateServiceDto.photoUrls) {
      updateServiceDto.photoUrls = JSON.parse(
        '[' + updateServiceDto.photoUrls + ']',
      );
    } else updateServiceDto.photoUrls = [];
    if (!Array.isArray(updateServiceDto.photoUrls))
      throw new BadRequestException('photoUrls must be array');

    let service = await this.findOne(id);
    service = { ...service, ...updateServiceDto };
    // Edit employee
    const employeeToServices = [];
    for (let i = 0; i < updateServiceDto.employeeIds.length; i++) {
      await this.employeeService.findOne(+updateServiceDto.employeeIds[i]);
      const createEmployeeToServiceDto = new CreateEmployeeToServiceDto();
      createEmployeeToServiceDto.serviceId = service.id;
      createEmployeeToServiceDto.employeeId = +updateServiceDto.employeeIds[i];
      employeeToServices.push(createEmployeeToServiceDto);
    }
    // Delete ets existed
    for (let i = 0; i < service.employeeToServices.length; i++) {
      await this.etsService.remove(service.employeeToServices[i].id);
    }
    // Assign new ets
    service.employeeToServices = employeeToServices;
    // Image
    const initIdPhotos = service.photos.map((x) => x.id);
    let photos = [];

    if (files || service.photos.length > updateServiceDto.photoUrls.length) {
      for (let i = 0; i < initIdPhotos.length; i++) {
        await this.servicePhotoService.remove(initIdPhotos[i]);
      }
      let j = 0;
      for (let i = 0; i < updateServiceDto.photoUrls.length; i++) {
        const createServicePhotoDto = new CreateServicePhotoDto();
        if (updateServiceDto.photoUrls[i].includes('blob:http://')) {
          try {
            const storageRef = ref(
              storage,
              `images/services/${service.id}/` + files[j].originalname,
            );
            const snapshot = await uploadBytes(storageRef, files[j].buffer);
            createServicePhotoDto.url = await getDownloadURL(snapshot.ref);
            photos.push(createServicePhotoDto);
            j++;
          } catch (error) {
            console.log(error);
            throw new BadRequestException(error);
          }
        } else {
          const createServicePhotoDto = new CreateServicePhotoDto();
          createServicePhotoDto.url = updateServiceDto.photoUrls[i];
          photos.push(createServicePhotoDto);
        }
      }
    } else {
      photos = service.photos;
    }
    service.photos = photos;
    return this.serviceRepo.save(service);
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
