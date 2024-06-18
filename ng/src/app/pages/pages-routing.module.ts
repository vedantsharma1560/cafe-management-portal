import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login-page/login-page.module').then(m => m.LoginPageModule) },
  { path: 'dashboard', component: NavbarComponent, loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'food', component: NavbarComponent, loadChildren: () => import('./food/food.module').then(m => m.FoodModule), canActivate: [AuthGuard] },
  { path: 'user-control', component: NavbarComponent, loadChildren: () => import('./user-controls/user-controls.module').then(m => m.UserControlsModule), canActivate: [AuthGuard] }  // component: HeaderComponent,
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
