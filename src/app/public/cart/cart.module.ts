import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";

@NgModule({
  declarations: [CartPageComponent],
  imports: [CommonModule, CoreModule, CartRoutingModule, SharedModule],
})
export class CartModule {}
