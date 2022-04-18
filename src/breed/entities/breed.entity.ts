import { PetType } from 'src/pet-type/entities/pet-type.entity';
import { Pet } from 'src/pet/entities/pet.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => PetType, (type) => type.breeds)
  type: PetType;

  @OneToMany(() => Pet, (pet) => pet.breed)
  pets: Pet[];
}
