import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { adminGuard } from './auth/admin.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PetTableComponent } from './pages/pet-table/pet-table.component';


const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  
  {
    path: 'home', component: HomeComponent, canActivate: [adminGuard]
  },
  {
    path: 'login', component: LoginComponent  
  },
  {
    path: 'pets', component: PetTableComponent, canActivate: [adminGuard]
  },
  {
    path: 'users', component: ProfileComponent, canActivate: [adminGuard]
  },
  {
    path: 'about', component: AboutComponent, canActivate: [adminGuard]
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }