import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { HelpComponent } from './pages/help/help.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PetDialogComponent } from './pet-dialog/pet-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PetInfosComponent } from './pet-infos/pet-infos.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AgeFormatPipe } from './age-format.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PetTableComponent } from './pages/pet-table/pet-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UsersComponent } from './pages/users/users.component';
import { TopWidgetsComponent } from './charts/top-widgets/top-widgets.component';
import { MonthsComponent } from './charts/months/months.component';
import { CategoryComponent } from './charts/category/category.component';
import { ChartModule } from 'angular-highcharts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    HelpComponent,
    NotFoundComponent,
    PetDialogComponent,
    PetInfosComponent,
    DeleteConfirmationDialogComponent,
    AgeFormatPipe,
    PetTableComponent,
    UsersComponent,
    TopWidgetsComponent,
    MonthsComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    ChartModule,
    ToastrModule.forRoot({
      "closeButton": true,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": true,
    }),
    BackButtonDisableModule.forRoot({
      preserveScroll: true
    })
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