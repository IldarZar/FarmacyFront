import { Identifiable } from '@app/core/models/identifable';

export interface UserRole extends Identifiable<number> {
  name: string;
}
