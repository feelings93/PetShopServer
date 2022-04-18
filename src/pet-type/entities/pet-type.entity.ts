import { Breed } from 'src/breed/entities/breed.entity';
import { Pet } from 'src/pet/entities/pet.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PetType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Pet, (pet) => pet.type)
  pets: Pet[];

  @OneToMany(() => Breed, (breed) => breed.type)
  breeds: Breed[];
}
