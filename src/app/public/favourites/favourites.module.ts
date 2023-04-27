import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesComponent } from './pages/favourite-page/favourites.component';

@NgModule({
  declarations: [FavouritesComponent],
  imports: [CommonModule, FavouritesRoutingModule],
})
export class FavouritesModule {}
