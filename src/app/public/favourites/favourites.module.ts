import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesComponent } from './pages/favourite-page/favourites.component';
import {SharedModule} from "@shared/shared.module";

@NgModule({
  declarations: [FavouritesComponent],
    imports: [CommonModule, FavouritesRoutingModule, SharedModule],
})
export class FavouritesModule {}
