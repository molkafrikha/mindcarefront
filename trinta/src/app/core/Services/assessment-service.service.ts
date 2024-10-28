import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Assessment } from '../models/assessment.model'; 

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  private apiUrl = 'http://127.0.0.1:8000/api/assessments/'; 

  constructor(private http: HttpClient) {}

  createAssessment(assessment: Assessment): Observable<Assessment> {
    const payload = this.mapAssessmentToPayload(assessment);
    console.log('Saving assessment to database:', payload);  // Log the data being sent to the server
    return this.http.post<Assessment>(this.apiUrl, payload).pipe(
      map((response: any) => this.mapResponseToAssessment(response)),  // Map the response to the frontend model
      tap((response) => console.log('Response from server:', response)),  // Log the response from the server
      catchError((error) => {
        console.error('Error response from server:', error);  // Log the error response
        return throwError(error);
      })
    );
  }

  getAssessments(): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(this.apiUrl).pipe(
      map((responses: any[]) => responses.map(response => this.mapResponseToAssessment(response)))
    );
  }

  private mapAssessmentToPayload(assessment: Assessment): any {
    return {
      date_of_assessment: assessment.dateOfAssessment.toISOString().split('T')[0],
      mood_rating: assessment.moodRating,
      anxiety_rating: assessment.anxietyRating,
      stress_rating: assessment.stressRating,
      sleep_quality_rating: assessment.sleepQualityRating,
      physical_pain_rating: assessment.physicalPainRating,
      coping_mechanisms: assessment.copingMechanisms,
      recent_events: assessment.recentEvents,
      daily_highlights: assessment.dailyHighlights,
      thought_patterns: assessment.thoughtPatterns,
      gratitude_entries: assessment.gratitudeEntries,
      comments: assessment.comments,
      follow_up_needed: assessment.followUpNeeded,
    };
  }

  private mapResponseToAssessment(response: any): Assessment {
    return {
      id: response.id,
      dateOfAssessment: new Date(response.date_of_assessment),
      moodRating: response.mood_rating,
      anxietyRating: response.anxiety_rating,
      stressRating: response.stress_rating,
      sleepQualityRating: response.sleep_quality_rating,
      physicalPainRating: response.physical_pain_rating,
      copingMechanisms: response.coping_mechanisms,
      recentEvents: response.recent_events,
      dailyHighlights: response.daily_highlights,
      thoughtPatterns: response.thought_patterns,
      gratitudeEntries: response.gratitude_entries,
      comments: response.comments,
      followUpNeeded: response.follow_up_needed,
    };
  }
}