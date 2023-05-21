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
import { CountSelectComponent } from './components/count-select/count-select.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ModalWindowComponent,
    FooterComponent,
    ButtonComponent,
    ProductCardComponent,
    MenuList,
    ComboboxComponent,
    CountSelectComponent,
  ],
  imports: [CommonModule, RouterModule],
    exports: [
        HeaderComponent,
        FooterComponent,
        ButtonComponent,
        MenuList,
        ProductCardComponent,
        ComboboxComponent,
        CountSelectComponent,
    ],
})
export class SharedModule {}
