import { Nullable } from '@core/models/nullable';

export interface SearchFilter {
  name: string;
  minPrice: number;
  maxPrice: number;
  controlled: boolean;
  categoryId: Nullable<number>;
  subCategoryId: Nullable<number>;
}
