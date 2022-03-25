import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepo.create(createCategoryDto);
    console.log(category);
    if (createCategoryDto.parentId)
      category.parent = await this.categoryRepo.findOne(
        createCategoryDto.parentId,
      );
    console.log(category);
    return this.categoryRepo.save(category);
  }

  findAll() {
    return this.categoryRepo.find({ relations: ['children', 'parent'] });
  }

  findOne(id: number) {
    return this.categoryRepo.findOne(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne(id, {
      relations: ['children', 'parent'],
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    category.name = updateCategoryDto.name;
    if (updateCategoryDto.parentId) {
      const parentCategory = await this.categoryRepo.findOne(
        updateCategoryDto.parentId,
      );

      category.parent = parentCategory;
    } else category.parent = null;

    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.categoryRepo.remove(category);
  }
}
