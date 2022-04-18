import { Breed } from 'src/breed/entities/breed.entity';
import { PetPhoto } from 'src/pet-photo/entities/pet-photo.entity';
import { PetType } from 'src/pet-type/entities/pet-type.entity';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  price: number;

  @Column()
  describe: string;

  @OneToMany(() => PetPhoto, (photo) => photo.pet, { cascade: true })
  photos: PetPhoto[];

  @ManyToOne(() => PetType, (type) => type.pets)
  type: PetType;

  @ManyToOne(() => Breed, (breed) => breed.pets)
  breed: Breed;
}
