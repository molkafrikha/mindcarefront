import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {interval, Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createSubmission(submissionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submissions/create`, submissionData);
  }

  checkSubmissionStatus(submissionId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/submissions/status/${submissionId}`);
  }

  uploadImageToS3(photoId: any, base64Image: string, fileName: string) {
    const body = { base64Image: base64Image , fileName:fileName };
    return this.http.post(`${this.apiUrl}/photos/${photoId}/upload`, body);
  }
  inProcessingSubmissions(eventId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/events/${eventId}/submissions-in-processing`);
  }
  approvedSubmissions(eventId: any, page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/events/${eventId}/submissions-approved`, {
      params: { page: page.toString() }
    });
  }

  approvedSubmissionsByWorker(eventId: any,workerId:any): Observable<any> {
    return this.http.get(`${this.apiUrl}/events/${eventId}/worker/${workerId}/submissions-approved`);
  }
  eventWorkerapprovedSubmissionsInfos(eventId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/events/${eventId}/worker-info`);
  }

  inProcessingSubmissionsByWorker(eventId: any, worker_id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/events/${eventId}/worker/${worker_id}/submissions-in-processing`);
  }
}
