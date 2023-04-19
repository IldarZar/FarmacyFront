import { Identifiable } from '@app/core/models/identifable';
import { UserRole } from './user-role';

export interface User extends Identifiable {
  login: string;
  password: string;
  roles: UserRole[];
}
