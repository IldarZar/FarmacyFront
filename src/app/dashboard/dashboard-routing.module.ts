import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataComponent } from '@dashboard/pages/user-data/user-data.component';
import { BonusCardComponent } from '@dashboard/pages/bonus-card/bonus-card.component';
import { DashboardComponent } from '@dashboard/dashboard.component';
import { UserResolver } from '@core/resolvers/user.resolver';
import { OrderHistoryComponent } from '@dashboard/pages/order-history/order-history.component';

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
        component: OrderHistoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
