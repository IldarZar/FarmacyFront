import { Identifiable } from '@app/core/models/identifable';
import { Subcategory } from '@shared/models/product/subcategory';

export interface Product extends Identifiable<number> {
  name: string;
  price: number;
  controlled: boolean;
  description: string;
  subCategory: Subcategory;
  imageUrl: string;
  isAvailable: boolean;
}
