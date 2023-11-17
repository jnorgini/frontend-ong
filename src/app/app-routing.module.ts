import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './auth/admin.guard';
import { LoginComponent } from './login/login.component';
import { DashboardLayoutComponent } from "./dashboard-layout/dashboard-layout.component";
import { HomeComponent } from './pages/home/home.component';
import { PetTableComponent } from './pages/pet-table/pet-table.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: '', component: DashboardLayoutComponent, children: [
      { path: 'home', component: HomeComponent, canActivate: [adminGuard] },
      { path: 'pets', component: PetTableComponent, canActivate: [adminGuard] },
      { path: 'users', component: UsersComponent, canActivate: [adminGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
