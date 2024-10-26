import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {  HttpHeaders,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

import { switchMap } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class DeviceSpecService {

  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;
  getDeviceSpec(device_name?: string, manufacturer?: string): Observable<any> {
    let params = new HttpParams();
    if (device_name) {
      params = params.set('device_name', device_name);
    }
    if (manufacturer) {
      params = params.set('manufacturer', manufacturer);
    }
    return this.http.get<any>(this.apiUrl+"/devices-spec-filter", { params });
  }

}
