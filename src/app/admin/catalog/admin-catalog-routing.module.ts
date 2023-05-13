import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsPageComponent } from '@public/catalog/pages/product-details-page/product-details-page.component';
import { ProductResolver } from '@core/resolvers/product.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsPageComponent,
    resolve: [ProductResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCatalogRoutingModule {}
