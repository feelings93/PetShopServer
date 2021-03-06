import { Category } from 'src/category/entities/category.entity';
import { ProductCartItem } from 'src/product-cart-item/entities/product-cart-item.entity';
import { ProductOrderItem } from 'src/product-order-item/entities/product-order-item.entity';
import { ProductPhoto } from 'src/product-photo/entities/product-photo.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  status: string;

  @Column()
  describe: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => SubCategory, (sub) => sub.products)
  subCategory: SubCategory;

  @OneToMany(() => ProductPhoto, (photo) => photo.product, { cascade: true })
  photos: ProductPhoto[];

  @OneToMany(
    () => ProductOrderItem,
    (productOrderItem) => productOrderItem.product,
  )
  productOrderItems: ProductOrderItem[];

  @OneToMany(
    () => ProductCartItem,
    (productCartItem) => productCartItem.product,
  )
  productCartItems: ProductCartItem[];
}
