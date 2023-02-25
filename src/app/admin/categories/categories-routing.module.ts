import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesGridComponent} from "@app/admin/categories/pages/categories-grid/categories-grid.component";
import {CategoriesCreateComponent} from "@app/admin/categories/pages/categories-create/categories-create.component";
import {CategoriesEditComponent} from "@app/admin/categories/pages/categories-edit/categories-edit.component";
import {CategoryResolver} from "@app/admin/categories/resolvers/category.resolver";

const routes: Routes = [
  {
    path: '',
    component: CategoriesGridComponent,
    children: [
      {
        path: 'edit/:id',
        resolve: [
          CategoryResolver
        ],
        component: CategoriesEditComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
