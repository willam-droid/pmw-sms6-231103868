import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Register } from './register/register';
import { Admin } from './admin/admin';
import { Dashboard2 } from './dashboard2/dashboard2';
import { Dashboard3 } from './dashboard3/dashboard3';
import { Mahasiswa } from './mahasiswa/mahasiswa';
import { otentikasiGuard } from './otentikasi-guard';
import { Logout } from './logout/logout';

export const routes: Routes = [
  { path: "admin", component: Admin},
  { path: "register", component: Register},
  { path: "dashboard", component: Dashboard, canActivate: [otentikasiGuard]},
  { path: "dashboard2", component: Dashboard2, canActivate: [otentikasiGuard]},
  { path: "dashboard3", component: Dashboard3},
  { path: "login", component: Login },
  { path: "mahasiswa", component: Mahasiswa, canActivate: [otentikasiGuard]},
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "logout", component: Logout}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutes{}
