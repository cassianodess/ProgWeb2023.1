import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/guards/auth.guard';
import { ReverseAuthGuard } from './services/guards/reverse-auth.guard';

const routes: Routes = [
  {path: "home/:id", component: HomeComponent, pathMatch: "full", canActivate: [AuthGuard]},
  {path: "auth", component: AuthComponent, pathMatch: "full", canActivate: [ReverseAuthGuard]},
  {path: "", redirectTo: "auth", pathMatch: "full"},
  {path: "**", redirectTo: "auth", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
