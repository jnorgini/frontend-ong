import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { ContentComponent } from './content/content.component';
import { WelcomeContentComponent } from './welcome-content/welcome-content.component';




@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    AuthComponent,
    LoginComponent,
    ButtonsComponent,
    ContentComponent,
    WelcomeContentComponent,


  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }