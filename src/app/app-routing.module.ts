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
    loadChildren: () => import('./public/catalog/catalog.module').then(m => m.CatalogModule),
  },
  {
    path: 'categories',
    loadChildren: () => import('./admin/categories/categories.module').then(m => m.CategoriesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
