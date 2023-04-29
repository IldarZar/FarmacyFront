import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthPageComponent } from '@public/auth/pages/auth-page/auth-page.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AuthPageComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
