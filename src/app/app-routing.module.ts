import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { adminGuard } from './auth/admin.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PetTableComponent } from './pages/pet-table/pet-table.component';
import { UsersComponent } from './pages/users/users.component';


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
    path: 'users', component: UsersComponent, canActivate: [adminGuard]
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