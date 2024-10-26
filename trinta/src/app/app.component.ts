import {Component, Inject, NgZone, OnInit, PLATFORM_ID} from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {ToggleService} from "./common/header/toggle.service";
import { FooterComponent } from './common/footer/footer.component';
import {AuthServiceService} from "./core/Services/auth-service.service";
import {App} from "@capacitor/app";
import {Platform} from "@angular/cdk/platform";
import {PluginListenerHandle} from "@capacitor/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // corrected from 'styleUrl' to 'styleUrls'
})
export class AppComponent implements OnInit{
  title = 'Mobicrowd';
  routerSubscription: any;
  location: any;
  isToggled = false;
  private backButtonSubscription: Promise<PluginListenerHandle>;

  constructor(
    public router: Router,
    public toggleService: ToggleService,
    public authService: AuthServiceService,
    private ngZone: NgZone, // Inject NgZone
    private platform: Platform,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.toggleService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const token = localStorage.getItem('jwt_token');

      if (token) {
        if (this.router.url === '/' || this.router.url === '/authentication' || this.router.url === '') {
          this.router.navigate(['/Dashboard']);
        }
      } else {
        // Check if the current URL is not the logout URL
        if (!this.isBlankPage()) {
          this.router.navigate(['/authentication']);
        }
      }
    });

    if (this.platform.IOS || this.platform.ANDROID) {
      this.backButtonSubscription = App.addListener('backButton', this.handleBackButton.bind(this));
    }
  }

  private handleBackButton() {
    this.ngZone.run(() => {
      if (this.router.url === '/Dashboard') {
        App.exitApp(); // Close the app if the current page is home (or your root page)
      } else {
        this.router.navigate(['..']); // Navigate back to the previous page
      }
    });
  }

  recallJsFunctions() {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
      .subscribe(event => {
        this.location = this.router.url;
        if (!(event instanceof NavigationEnd)) {
          return;
        }
        this.scrollToTop();
      });
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  // Blank page check
  isBlankPage(): boolean {
    const blankRoutes = [
      '/authentication',
      '/authentication/sign-up',
      '/authentication/signupworker',
      '/authentication/forgot-password',
      '/authentication/reset-password',
      '/authentication/lock-screen',
      '/authentication/logout',
      '/authentication/confirm-email'
    ];
    return blankRoutes.includes(this.router.url);
  }
}
