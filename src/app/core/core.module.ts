import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import {AuthModule} from "../public/auth/auth.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    AuthModule,
  ],
  exports: [
    AuthModule,
  ]
})
export class CoreModule { }
