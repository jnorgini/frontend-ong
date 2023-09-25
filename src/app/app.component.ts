import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from './services/authentication.service';
import { JwtAuth } from './models/jwtAuth';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  jwtDto = new JwtAuth();
  
  constructor(private observer: BreakpointObserver, private router: Router, 
    private authService: AuthenticationService, private toastr: ToastrService, private dialog: MatDialog
    ) { }
  
  logout() {
    localStorage.removeItem('jwtToken' + this.jwtDto.token);
    // this.router.navigate(['/login']);
    this.toastr.info('Sessão encerrada.')
    window.location.reload();
  }

  ngOnInit() {
    const dialogRef = this.dialog.open(LoginComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/home') {
          this.dialog.closeAll();
        }
      }
    });    
  }

  ngAfterViewInit() {
    this.observer.observe(["(max-width: 800px)"])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = "over";
          this.sidenav.close();
        } else {
          this.sidenav.mode = "side";
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        untilDestroyed(this)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      })
  }

}
