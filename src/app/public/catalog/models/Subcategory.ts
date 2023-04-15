import {Category} from "./category";
import {Identifiable} from "../../../shared/models/identifable";

export interface Subcategory extends Identifiable {
  name: string;
  parentCategory: Category;
}
