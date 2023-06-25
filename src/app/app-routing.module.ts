import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: "home/:id", component: HomeComponent, pathMatch: "full"},
  {path: "auth", component: AuthComponent, pathMatch: "full"},
  {path: "**", redirectTo: "auth"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
