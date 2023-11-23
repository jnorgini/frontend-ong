import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, filter } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../services/token-storage.service';

@UntilDestroy()
@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  darkModeEnabled = false;
  isLoggedIn = false;
  hasAdminRole = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private toastr: ToastrService,
    private router: Router,
    private observer: BreakpointObserver
  ) { }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']).then(() => {});
    this.toastr.info('Sessão encerrada.')
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getAccessToken();
    if (this.isLoggedIn) {
      const roles = this.tokenStorageService.getRoles();
      this.hasAdminRole = roles.includes('ROLE_ADMIN');
    }
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
