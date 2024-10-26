import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import {AuthServiceService} from "../Services/auth-service.service";


@Injectable({
  providedIn: 'root',
})
export class LoginRedirectGuard implements CanActivate {

    constructor(
        private authService: AuthServiceService,
        private router: Router
    ) {}

    canActivate(): boolean {
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            console.log("***********************",currentUser)
            // If the user is logged in, redirect to 'accueil'
            this.router.navigate(['/accueil']);
            return false;
        } else {
            // If the user is not logged in, redirect to the login page
            this.router.navigate(['/authentication/login']);
            return false;
        }
    }


}
