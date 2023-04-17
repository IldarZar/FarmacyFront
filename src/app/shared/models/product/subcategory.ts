import {Category} from "./category";
import {Identifiable} from "../identifable";

export interface Subcategory extends Identifiable {
  name: string;
  parentCategory: Category;
}
