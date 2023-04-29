import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCatalogRoutingModule } from './admin-catalog-routing.module';
import { AdminProductDetailsPageComponent } from './pages/admin-product-details-page/admin-product-details-page.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AdminProductDetailsPageComponent
  ],
  imports: [
    CommonModule,
    AdminCatalogRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminCatalogModule { }
