import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from "./pages/account-page/account-page.component";
import {UserResolver} from "../../core/resolvers/user.resolver";
import {AuthGuard} from "../../core/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    resolve: [UserResolver],
    component: AccountPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
