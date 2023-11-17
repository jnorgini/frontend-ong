import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { delay, filter } from "rxjs/operators";
import { BreakpointObserver } from '@angular/cdk/layout';

@UntilDestroy()
@Component({
  selector: 'app-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  darkModeEnabled = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private observer: BreakpointObserver
  ) { }

  logout() {
    this.router.navigate(['/login']).then(() => {});
    this.toastr.info('Sessão encerrada.')
  }

  toggleDarkMode() {
    this.darkModeEnabled = !this.darkModeEnabled;
    const container = document.querySelector('.mat-sidenav-container');

    if (this.darkModeEnabled) {
      container?.classList.add('dark-mode');
    } else {
      container?.classList.remove('dark-mode');
    }
  }

  ngAfterViewInit() {
    this.observer.observe(["(max-width: 800px)"])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = "over";
          this.sidenav.close().then(() => {});
        } else {
          this.sidenav.mode = "side";
          this.sidenav.open().then(() => {});
        }
      });

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        untilDestroyed(this)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close().then(() => {});
        }
      })
  }
}
