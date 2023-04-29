import { Identifiable } from '@app/core/models/identifable';
import { UserRole } from './user-role';
import { DeliveryPoint } from '@shared/models/delivery-point';

export interface User extends Identifiable<number> {
  login: string;
  password: string;
  roles: UserRole[];
  favorites: number[];
  userRoom: {
    sum: number;
    bonusPoints: number;
  };
  name: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  deliveryPoint: DeliveryPoint;
}
