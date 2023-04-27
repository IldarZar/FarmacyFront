import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataComponent } from '@dashboard/pages/user-data/user-data.component';
import { BonusCardComponent } from '@dashboard/pages/bonus-card/bonus-card.component';
import { DashboardComponent } from '@dashboard/dashboard.component';
import { UserResolver } from '@core/resolvers/user.resolver';
import { OrderHistoryResolver } from '@core/resolvers/order-history.resolver';
import { OrderHistoryComponent } from '@dashboard/pages/order-history/order-history.component';
import { UserOrdersComponent } from '@dashboard/pages/user-orders/user-orders.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-data',
  },
  {
    path: '',
    component: DashboardComponent,
    resolve: { user: UserResolver },
    children: [
      {
        path: 'user-data',
        resolve: { user: UserResolver },
        component: UserDataComponent,
      },
      {
        path: 'bonus-card',
        resolve: { user: UserResolver },
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
