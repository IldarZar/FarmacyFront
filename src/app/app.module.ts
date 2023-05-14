import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from '@core/interceptors/base-url.interceptor';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { DashboardModule } from '@dashboard/dashboard.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AppState } from '@app/store/app/app.state';
import { CatalogModule } from '@app/catalog/catalog.module';

// TODO: Запретить кидать товары в избранное без авторизации
// TODO: Сделать поисковик
// TODO: role id = 2 - admin, сделать нормальную проверку на права
// TODO: убрать Nullable, мб без него норм будет

@NgModule({
  declarations: [AppComponent],
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
  bootstrap: [AppComponent],
})
export class AppModule {}
