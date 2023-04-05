import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from "@angular/common/http";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { HeaderComponent } from './components/header/header.component';
import {MatTableModule} from "@angular/material/table";
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/button/button.component';

const materialModules = [
  MatSlideToggleModule,
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule
];

@NgModule({
  declarations: [
    HeaderComponent,
    ModalWindowComponent,
    FooterComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    ...materialModules
  ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ...materialModules,
        ButtonComponent
    ],
})
export class SharedModule { }
