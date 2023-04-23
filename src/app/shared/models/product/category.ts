import { Identifiable } from '@app/core/models/identifable';

export interface Category extends Identifiable<number> {
  name: string;
}
