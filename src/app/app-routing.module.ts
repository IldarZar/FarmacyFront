import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/catalog',
    pathMatch: 'full',
  },
  {
    path: 'catalog',
    loadChildren: () => import('@app/public/catalog/catalog.module').then(m => m.CatalogModule),
  },
  {
    path: 'categories',
    loadChildren: () => import('@app/admin/categories/categories.module').then(m => m.CategoriesModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@app/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('@app/public/cart/cart.module').then(m => m.CartModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
