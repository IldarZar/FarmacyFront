import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { SubcategoriesComponent } from './components/subcategories/subcategories.component';
import {AdminCatalogModule} from "../../admin/catalog/admin-catalog.module";

@NgModule({
  declarations: [
    CatalogPageComponent,
    ProductCardComponent,
    CategoriesComponent,
    ProductDetailsPageComponent,
    SubcategoriesComponent,
  ],
  imports: [CommonModule, SharedModule, HttpClientModule, CatalogRoutingModule, AdminCatalogModule],
})

export class CatalogModule {}
