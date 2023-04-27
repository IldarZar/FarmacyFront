import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '@shared/shared.module';
import { UserDataComponent } from '@dashboard/pages/user-data/user-data.component';
import { BonusCardComponent } from './pages/bonus-card/bonus-card.component';
import { DashboardComponent } from './dashboard.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';

@NgModule({
  declarations: [
    UserDataComponent,
    BonusCardComponent,
    DashboardComponent,
    OrderHistoryComponent,
    UserOrdersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
