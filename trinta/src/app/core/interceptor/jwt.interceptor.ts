import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthServiceService} from "../Services/auth-service.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthServiceService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            // Clone the request to add the new header.
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(token);
        }

        // Pass on the cloned request instead of the original request.
        return next.handle(request);
    }
}
