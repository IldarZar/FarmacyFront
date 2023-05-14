import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { FilterComponent } from './components/filter/filter.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CatalogPageComponent,
    CategoriesComponent,
    ProductDetailsPageComponent,
    FilterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    CatalogRoutingModule,
    ReactiveFormsModule,
    NgxSliderModule,
  ],
})
export class CatalogModule {}
