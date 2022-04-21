import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { BreedService } from 'src/breed/breed.service';
import { CreatePetPhotoDto } from 'src/pet-photo/dto/create-pet-photo.dto';
import { PetPhotoService } from 'src/pet-photo/pet-photo.service';
import { PetTypeService } from 'src/pet-type/pet-type.service';
import { storage } from 'src/utils/firebase-storage.utils';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet) private readonly petRepo: Repository<Pet>,
    private readonly petTypeService: PetTypeService,
    private readonly breedService: BreedService,
    private readonly petPhotoService: PetPhotoService,
  ) {}
  async create(createPetDto: CreatePetDto, files: Array<Express.Multer.File>) {
    if (isNaN(+createPetDto.price))
      throw new BadRequestException('price must be number!');
    if (isNaN(+createPetDto.age))
      throw new BadRequestException('age must be number!');
    if (isNaN(+createPetDto.breedId))
      throw new BadRequestException('breedId must be number!');
    if (isNaN(+createPetDto.typeId))
      throw new BadRequestException('typeId must be number!');
    const pet = await this.petRepo.create(createPetDto);
    // Add relation
    pet.breed = await this.breedService.findOne(createPetDto.breedId);
    pet.type = await this.petTypeService.findOne(createPetDto.typeId);

    // Upload images to firebase storage
    const photos = [];
    for (let i = 0; i < files.length; i++) {
      const createPetPhotoDto = new CreatePetPhotoDto();
      try {
        const storageRef = ref(
          storage,
          `images/pets/${pet.id}/` + files[i].originalname,
        );
        const snapshot = await uploadBytes(storageRef, files[i].buffer);
        createPetPhotoDto.url = await getDownloadURL(snapshot.ref);
        photos.push(createPetPhotoDto);
      } catch (error) {
        console.log(error);
        throw new BadRequestException();
      }
    }
    pet.photos = photos;
    return this.petRepo.save(pet);
  }

  findAll() {
    return this.petRepo.find({ relations: ['type', 'breed', 'photos'] });
  }

  async findOne(id: number) {
    const pet = await this.petRepo.findOne(id, {
      relations: ['type', 'breed', 'photos'],
    });
    if (!pet) throw new NotFoundException('Pet not found!');
    return pet;
  }

  async update(
    id: number,
    updatePetDto: UpdatePetDto,
    files: Array<Express.Multer.File>,
  ) {
    if (updatePetDto.price && isNaN(+updatePetDto.price))
      throw new BadRequestException('price must be number!');
    if (updatePetDto.age && isNaN(+updatePetDto.age))
      throw new BadRequestException('age must be number!');
    if (updatePetDto.breedId && isNaN(+updatePetDto.breedId))
      throw new BadRequestException('breedId must be number!');
    if (updatePetDto.typeId && isNaN(+updatePetDto.typeId))
      throw new BadRequestException('typeId must be number!');
    if (updatePetDto.photoUrls) {
      updatePetDto.photoUrls = JSON.parse('[' + updatePetDto.photoUrls + ']');
    } else updatePetDto.photoUrls = [];
    console.log(updatePetDto.photoUrls);
    if (!Array.isArray(updatePetDto.photoUrls))
      throw new BadRequestException('photoUrls must be array');

    let pet = await this.findOne(id);
    pet = { ...pet, ...updatePetDto };

    // Add relation
    pet.breed = await this.breedService.findOne(updatePetDto.breedId);
    pet.type = await this.petTypeService.findOne(updatePetDto.typeId);
    const initIdPhotos = pet.photos.map((x) => x.id);
    let photos = [];

    if (files || pet.photos.length > updatePetDto.photoUrls.length) {
      for (let i = 0; i < initIdPhotos.length; i++) {
        await this.petPhotoService.remove(initIdPhotos[i]);
      }
      let j = 0;
      for (let i = 0; i < updatePetDto.photoUrls.length; i++) {
        const createPetPhotoDto = new CreatePetPhotoDto();
        if (updatePetDto.photoUrls[i].includes('blob:http://')) {
          try {
            const storageRef = ref(
              storage,
              `images/pets/${pet.id}/` + files[j].originalname,
            );
            const snapshot = await uploadBytes(storageRef, files[j].buffer);
            createPetPhotoDto.url = await getDownloadURL(snapshot.ref);
            photos.push(createPetPhotoDto);
            j++;
          } catch (error) {
            console.log(error);
            throw new BadRequestException(error);
          }
        } else {
          const createPetPhotoDto = new CreatePetPhotoDto();
          createPetPhotoDto.url = updatePetDto.photoUrls[i];
          photos.push(createPetPhotoDto);
        }
      }
    } else {
      photos = pet.photos;
    }
    pet.photos = photos;
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
