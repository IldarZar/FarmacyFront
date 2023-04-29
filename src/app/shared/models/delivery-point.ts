import { Identifiable } from '@core/models/identifable';

export interface DeliveryPoint extends Identifiable<number> {
  name: string;
  address: string;
  workStart: string;
  workEnd: string;
  latitude: number;
  longitude: number;
}
