import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {CatalogModule} from "./public/catalog/catalog.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {BaseUrlInterceptor} from "./core/interceptors/base-url.interceptor";
import {NgxsModule} from "@ngxs/store";
import {AppState} from "./app.state";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {DashboardModule} from "./dashboard/dashboard.module";
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      SharedModule,
      CatalogModule,
      DashboardModule,
      CoreModule,
      NgxsModule.forRoot([AppState]),
      NgxsLoggerPluginModule.forRoot(),
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
