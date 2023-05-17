import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';

import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/button/button.component';
import { MenuList } from '@shared/components/menu-list/menu-list';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { ComboboxComponent } from './components/combobox/combobox.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ModalWindowComponent,
    FooterComponent,
    ButtonComponent,
    ProductCardComponent,
    MenuList,
    ComboboxComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    MenuList,
    ProductCardComponent,
    ComboboxComponent,
  ],
})
export class SharedModule {}
