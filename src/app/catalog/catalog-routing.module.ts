import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { ProductResolver } from '@core/resolvers/product.resolver';

const routes: Routes = [
  {
    path: '',
    component: CatalogPageComponent,
  },
  // {
  //   path: 'admin/:id',
  //   component: AdminProductDetailsPageComponent,
  //   canActivate: [AdminGuard],
  //   resolve: { product: ProductResolver },
  // },

  {
    path: 'create',
    component: ProductDetailsPageComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: ProductDetailsPageComponent,
    resolve: { product: ProductResolver },
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
