import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';

import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/button/button.component';
import { RouterLinkWithHref, RouterModule } from "@angular/router";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";

@NgModule({
  declarations: [
    HeaderComponent,
    ModalWindowComponent,
    FooterComponent,
    ButtonComponent,
    SideMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    SideMenuComponent,
  ],
})
export class SharedModule { }
