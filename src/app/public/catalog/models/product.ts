import { Category } from './category';
import {Identifiable} from "../../../shared/models/identifable";

export interface Product extends Identifiable {
  name: string;
  price: number;
  imgUrl: string;
  controlled: boolean;
  category: Category;
}
