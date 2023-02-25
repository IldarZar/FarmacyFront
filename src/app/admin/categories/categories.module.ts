import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesGridComponent } from './pages/categories-grid/categories-grid.component';
import { CategoriesCreateComponent } from './pages/categories-create/categories-create.component';
import { HttpClientModule } from "@angular/common/http";
import {SharedModule} from "@app/shared/shared.module";
import { CategoriesEditComponent } from './pages/categories-edit/categories-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    CategoriesGridComponent,
    CategoriesCreateComponent,
    CategoriesEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoriesRoutingModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class CategoriesModule { }
