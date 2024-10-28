import { Injectable } from '@angular/core';
import { HttpClient , HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {Observable, BehaviorSubject, map, of} from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {User} from "../models/user";  // Import correct de jwt-decode

interface UserSession {
  user: {
    currentUser: {
      id: number;
      msg: string;  // If you need the message from the response
      role: string;
    };
    jwt_token: string;

  };
  success: string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  constructor(private http: HttpClient,
              private router: Router
  ) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
  setUserId(id: number): void {
    localStorage.setItem('id', id.toString());
  }

  // Méthode pour récupérer l'ID de l'utilisateur depuis le localStorage
  getUserId() {
    return  localStorage.getItem('id');

  }
  gettoken() {
    return  localStorage.getItem('jwt_token');

  }
  isTokenValid(): boolean {
    const token = localStorage.getItem('jwt_token');
    // Add your logic here to check the validity of the token
    // This could involve decoding the token to check its expiry, or making an API call to validate it
    return !!token; // For now, just checks if the token exists
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          console.log ('current user' , user)

          if(user && user.access && user.id){
            console.log(user)
            localStorage.setItem('jwt_token', user.access);
            localStorage.setItem('refresh_token', user.refresh);
            localStorage.setItem('id', user.id);
            localStorage.setItem('role', user.role);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user)
          } else {
            // if credentials are invalid or some other error occurs
            console.log(user);
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('id');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('role');
            return {msg: 'Invalid Credentials'};
          }
          return user;
        })
      );
  }

  logout() {
    console.log(localStorage.getItem('jwt_token'));

    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');

    // Optionally, you can also clear any other related data
    // localStorage.clear(); // To clear all local storage data

    // @ts-ignore
    this.currentUserSubject.next();

    // Navigate to the login page after logging out
    this.router.navigate(['/authentication']);

    return of({ success: false });
  }


  getUserById(user_id: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${user_id}`, {});
  }
  getRequesterById(user_id: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/requester/${user_id}`, {});
  }
  getEvents(): Observable<any> {
   return this.http.get(`${this.apiUrl}/events`, {});
  }
  joinEvent(event_id: number, requestBody: { worker_id: any; device_specs: any; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/events/join/${event_id}`, requestBody);
  }
  requestPasswordReset(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/forget-password/${email}`, {});
  }

  registerWorker(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registe_patient`, data);
  }

  registerRequester(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register_doctor`, data);
  }


// Créer un nouvel événement
createEvent(eventData: any): Observable<any> {
  const id = this.getUserId();  // Obtenir l'ID de l'utilisateur actuel
  if (id) {
    eventData.doctor = id;  // Ajouter l'ID du demandeur au payload
  } else {
    throw new Error('User ID is not available');
  }
  return this.http.post(`${this.apiUrl}/events/create`, eventData);

}

setNewPassword(userId: number, token: string, password: string, confirmPassword: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/set-new-password/${userId}/${token}`, { password, confirmPassword });
}

changePassword(userId: number, password: string, confirmPassword: string): Observable<any> {
  const url = `${this.apiUrl}/user/${userId}/change-password`;
  return this.http.post(url, { password, confirmPassword });
}


}
