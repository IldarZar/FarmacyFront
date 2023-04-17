import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ProductDetailsPageComponent
} from "../../public/catalog/pages/product-details-page/product-details-page.component";
import {ProductResolver} from "../../public/catalog/resolvers/product.resolver";

const routes: Routes = [
  {
    path: 'catalog/admin/:id',
    component: ProductDetailsPageComponent,
    resolve: [ProductResolver],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCatalogRoutingModule { }
