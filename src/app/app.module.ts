import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
