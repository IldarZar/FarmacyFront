import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '@shared/shared.module';
import { UserDataComponent } from '@dashboard/pages/user-data/user-data.component';
import { BonusCardComponent } from './pages/bonus-card/bonus-card.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [UserDataComponent, BonusCardComponent, DashboardComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
