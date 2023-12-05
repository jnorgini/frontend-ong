import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardLayoutComponent } from "./dashboard-layout/dashboard-layout.component";
import { HomeComponent } from './pages/home/home.component';
import { PetsComponent } from './pages/pets/pets.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: '', component: DashboardLayoutComponent, children: [
      { path: 'home', component: HomeComponent, canActivate: [authGuard] },
      { path: 'pets', component: PetsComponent, canActivate: [authGuard] },
      { path: 'users', component: UsersComponent, canActivate: [authGuard], data: { role: 'ROLE_ADMIN' } },
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
