import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { HelpComponent } from './pages/help/help.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'about', component: AboutComponent},
  { path: 'help', component: HelpComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }