import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from "@angular/common/http";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

const materialModules = [
  MatSlideToggleModule,
  MatToolbarModule,
  MatCardModule,
  MatButtonModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ...materialModules
  ],
  exports: materialModules,
})
export class SharedModule { }
