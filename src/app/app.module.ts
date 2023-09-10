import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment'; // Importe o MomentModule
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MomentModule // Adicione o MomentModule aos imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
