import { Identifiable } from "@app/shared/models/identifable";
import { Category } from "@app/public/catalog/models/category";

export interface Product extends Identifiable {
  name: string;
  price: number;
  controlled: boolean;
  category: Category;
}
