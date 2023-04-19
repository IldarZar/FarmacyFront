import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalog',
    pathMatch: 'full',
  },
  {
    path: 'cart',
    pathMatch: 'full',
    loadChildren: () =>
      import('./public/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./public/catalog/catalog.module').then((m) => m.CatalogModule),
  },
  {
    path: 'auth',
    pathMatch: 'full',
    loadChildren: () =>
      import('./public/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
