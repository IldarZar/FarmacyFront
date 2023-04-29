import { Category } from './category';
import { Identifiable } from '@app/core/models/identifable';

export interface Subcategory extends Identifiable<number> {
  name: string;
  parentCategory: Category;
}
