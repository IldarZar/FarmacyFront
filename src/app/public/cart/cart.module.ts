import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CartPageComponent],
  imports: [CommonModule, CoreModule, CartRoutingModule, SharedModule],
})
export class CartModule {}
