import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {AuthServiceService} from "../Services/auth-service.service";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthServiceService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.authService.currentUser.pipe(
            take(1),
            map(user => {
                // Check if a user object exists
                if (user) {
                    console.log(user.role)
                    console.log(route.data['roles'])
                    // Perform additional checks if necessary, for example, checking user roles
                    if (route.data['roles'] && route.data['roles'].indexOf(user.role) === -1) {
                      this.router.navigate(['/authentication/login']);
                      return false;
                    }

                    // Check if the token is valid
                    if (this.authService.isTokenValid()) {
                        return true;
                    } else {
                        // If the token is invalid, navigate to login
                        this.router.navigate(['/authentication']);
                        return false;
                    }
                } else {
                    // If no user object exists, navigate to login
                    this.router.navigate(['/authentication']);
                    return false;
                }
            })
        );
    }
}

