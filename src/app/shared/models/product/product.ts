import { Category } from './category';
import { Identifiable } from '@app/core/models/identifable';

export interface Product extends Identifiable<number> {
  name: string;
  price: number;
  imgUrl: string;
  controlled: boolean;
  subCategory: Category;
}
