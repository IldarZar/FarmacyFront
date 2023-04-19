import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { ProductResolver } from './resolvers/product.resolver';
import { AdminProductDetailsPageComponent } from '@app/admin/catalog/pages/admin-product-details-page/admin-product-details-page.component';
import { UserResolver } from '@app/core/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: [UserResolver],
    component: CatalogPageComponent,
  },
  {
    path: 'admin/:id',
    component: AdminProductDetailsPageComponent,
    resolve: [ProductResolver],
  },
  {
    path: ':id',
    component: ProductDetailsPageComponent,
    resolve: [ProductResolver],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
