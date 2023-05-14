import { ProductOrder } from '@shared/models/product-order';
import { Identifiable } from '@core/models/identifable';
import { DeliveryPoint } from '@shared/models/delivery-point';
import { OrderStatus } from '@shared/models/enums/order-status';
import { User } from '@shared/models/user/user';

export interface UserOrder extends Identifiable<number> {
  orderDateTime: Date;
  expectedDate: Date;
  lastStorageDay: Date;
  productOrder: ProductOrder[];
  sum: number;
  deliveryPoint: DeliveryPoint;
  status: OrderStatus;
  // потому что бэк возвращает только ид
  user: User;
}
