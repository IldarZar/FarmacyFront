import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataComponent } from '@dashboard/pages/user-data/user-data.component';
import { BonusCardComponent } from '@dashboard/pages/bonus-card/bonus-card.component';
import { DashboardComponent } from '@dashboard/dashboard.component';
import { OrderHistoryComponent } from '@dashboard/pages/order-history/order-history.component';
import { UserOrdersComponent } from '@dashboard/pages/user-orders/user-orders.component';
import { OrderHistoryResolver } from '@core/resolvers/order-history.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-data',
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'user-data',
        component: UserDataComponent,
      },
      {
        path: 'bonus-card',
        component: BonusCardComponent,
      },
      {
        path: 'order-history',
        resolve: { orderHistory: OrderHistoryResolver },
        component: OrderHistoryComponent,
      },
      {
        path: 'user-orders',
        component: UserOrdersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
