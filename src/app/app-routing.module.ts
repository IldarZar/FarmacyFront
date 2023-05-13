import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

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
    path: 'favourites',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./public/favourites/favourites.module').then(
        (m) => m.FavouritesModule
      ),
  },
  {
    path: 'auth',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./public/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
