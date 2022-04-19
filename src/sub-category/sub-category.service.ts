import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Repository } from 'typeorm';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { SubCategory } from './entities/sub-category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepo: Repository<SubCategory>,
    private readonly categoryService: CategoryService,
  ) {}
  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const subCategory = await this.subCategoryRepo.create(createSubCategoryDto);
    const category = await this.categoryService.findOne(
      createSubCategoryDto.categoryId,
    );
    subCategory.category = category;
    return this.subCategoryRepo.save(subCategory);
  }

  findAll() {
    return this.subCategoryRepo.find({ relations: ['category', 'products'] });
  }

  async findOne(id: number) {
    const subCategory = await this.subCategoryRepo.findOne(id, {
      relations: ['category', 'products'],
    });
    if (!subCategory) {
      throw new NotFoundException('SubCategory not found!');
    }
    return subCategory;
  }

  async update(id: number, updateSubCategoryDto: UpdateSubCategoryDto) {
    const subCategory = await this.findOne(id);
    if (updateSubCategoryDto?.name)
      subCategory.name = updateSubCategoryDto.name;
    return this.subCategoryRepo.save(subCategory);
  }

  remove(id: number) {
    return `This action removes a #${id} subCategory`;
  }
}
