import { Identifiable } from '@app/core/models/identifable';
import { UserRole } from './user-role';

export interface User extends Identifiable<number> {
  login: string;
  password: string;
  roles: UserRole[];
  userRoom: {
    sum: number;
    bonusPoints: number;
  };
}
