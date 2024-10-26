import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {  HttpHeaders,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

import { switchMap } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import { Event } from '../models/event';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}



  // Créer un nouvel événement
  createEvent(eventData: any): Observable<any> {
    // Utilise directement localStorage pour obtenir le token
    return this.http.post(this.baseUrl + '/events/create', eventData);
  }


  

  // Autres méthodes de service sans dépendance circulaire


  // Liste des événements
  getAllEvents(): Observable<any> {
    return this.http.get<Event[]>(this.baseUrl + '/events');
}
getComments(eventId: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.get(`${this.baseUrl}/events/${eventId}/comments`, { headers });
}
sendComment(eventId: number, patientId: string | null, content: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  // Update the commentData object to match the expected JSON structure
  const commentData = {
    event: eventId,       // Change 'event_id' to 'event'
    patient: patientId,   // Change 'patient_Id' to 'patient' (this can still be null)
    content: content
  };

  return this.http.post(`${this.baseUrl}/comments`, commentData, { headers });
}


// Analyse de sentiment
sentimentAnalysis(eventData: any): Observable<any> {
  const token = localStorage.getItem('token'); // Récupérer le token depuis localStorage

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`, // Ajouter le token à l'en-tête Authorization
    'Content-Type': 'application/json' // Assurer le type de contenu correct
  });

  return this.http.post(`${this.baseUrl}/sentiment-analysis`, eventData, { headers });
}

  getUpcomingEvents(): Observable<any> {
    return this.http.get(this.baseUrl + '/events/upcoming');
  }
  getPastEvents(): Observable<any> {
    return this.http.get(this.baseUrl + '/events/past');
  }

  // Détail d'un événement par ID

  // Rejoindre un événement


  // Evénements rejoints par le travailleur
  getWorkerJoinedEvents(worker_id:any): Observable<any> {
    return this.http.get(this.baseUrl + `/worker/${worker_id}/events/joined/all`);
  }
  getWorkerJoinedUpcomingEvents(worker_id:any): Observable<any> {
    return this.http.get(this.baseUrl + `/worker/${worker_id}/events/joined/upcoming`);
  }

  getWorkerJoinedPastEvents(worker_id:any): Observable<any> {
    return this.http.get(this.baseUrl + `/worker/${worker_id}/events/joined/past`);
  }




  // Mettre à jour un événement existant
  updateEvent(eventId: number, eventData: any): Observable<any> {
    return this.http.put(this.baseUrl + `/events/${eventId}`, eventData);
  }

  // Supprimer un événement existant
  deleteEvent(event_id: number): Observable<any> {
    return this.http.delete(this.baseUrl + `/events/${event_id}`);
  }

  getPendingRequesters(): Observable<any> {
    return this.http.get(this.baseUrl + '/PendingRequester');
  }

  approveRequester(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/requester/${email}/approve-account`, {});
  }

  // Reject a requester
  rejectRequester(email: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/requester/${email}/reject-account`, {});
  }

  getApprovedRequesters(): Observable<any> {
    return this.http.get(this.baseUrl + '/requesters/approved');
  }
  getApprovedRequestersNmes(): Observable<any> {
    return this.http.get(this.baseUrl + '/requesters/names');
  }
  getWorkerEventStatus(eventId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl +`/events/${eventId}/worker_status`);
  }
  getActiveWorker(): Observable<any> {
    return this.http.get(this.baseUrl + '/active-workers');
  }
  geteventById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/events/${id}`);
  }
  getRequesterEvents(): Observable<any> {
    return this.http.get(this.baseUrl + '/events/requester/all');
  }
  getRequesterUpcomingEvents(): Observable<any> {
    return this.http.get(this.baseUrl + '/events/requester/upcoming');
  }
  getRequesterPastEvents(): Observable<any> {
    return this.http.get(this.baseUrl + '/events/requester/past');
  }
  getPendingInvitations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pending-invitations`);
  }

  alleventnotJoined(): Observable<any> {
    return this.http.get(`${this.baseUrl}/events/available-for-worker`);
  }

  // Accepter une invitation
  acceptInvitation(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/events/approve/${id}`, {});
  }

  // Refuser une invitation
  rejectInvitation(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/events/refuse/${id}`, {});
  }


 // getTotalUsers(): Observable<{ totalUsers: number }> {
   // return this.http.get<{ totalUsers: number }>(`${this.baseUrl}/total-users`);
//}

getEvents(): Observable<{ total_events_today: number; total_events: number }> {
  return this.http.get<any>(`${this.baseUrl}/total-events-today`);
}
getTotalUsers(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/total-users`);
}


getSubmissionCount(eventId: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/submission-count/${eventId}`);
}
  getAcceptedSubmissionCount(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/submission-count-accepted/${eventId}`);
  }

getEventStatistics(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/stats/event`);
}
getworkerjoinedEvent(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/WorkerJoinedEvents`);
}

getWorkerStatistics(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/api/stats/worker`);
}
getRequesterEventStatistics(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/requester-event-statistics`);
}
getWrokerEventStatistics(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/worker-event-statistics`);
}

getWorkerEventDetails(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/worker-event-details`);
}

getParticipationRate(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/stats/workerApproved`);
}

  getFilteredEvents(filters: any,tab:any): Observable<any> {
    let params = new HttpParams();

    if (filters.selectedEventType) {
      params = params.append('type', filters.selectedEventType);
    }
    if (filters.selectedRequester) {
      params = params.append('requester', filters.selectedRequester);
    }
    if (filters.selectedPriceRange) {
      const [minPrice, maxPrice] = filters.selectedPriceRange.split(' - ').map((price: string) => price.replace('$', '').trim());
      params = params.append('cost_min', minPrice);
      params = params.append('cost_max', maxPrice);
    }
    if (filters.selectedPhotoRange) {
      const [minPhotos, maxPhotos] = filters.selectedPhotoRange.split(' - ').map((photo: string) => photo.trim());
      params = params.append('numberOfPhotos_min', minPhotos);
      params = params.append('numberOfPhotos_max', maxPhotos);
    }
    if (filters.selectedDateRange?.start && filters.selectedDateRange?.end) {
      const startDate = new Date(filters.selectedDateRange.start);
      const endDate = new Date(filters.selectedDateRange.end);

      params = params.append('deadline_after', startDate.toISOString().split('T')[0]);
      params = params.append('deadline_before', endDate.toISOString().split('T')[0]);
    }

    if (filters.workerId) {
      params = params.append('worker_id', filters.workerId);
    }
    if (filters.requesterId) {
      params = params.append('requester_id', filters.requesterId);
    }
    params = params.append('tab', tab);
    return this.http.get(`${this.baseUrl}/events/filter`, { params });
  }

gettotalrequestNotif(): Observable<{
  not_approved_count
  : number }> {
  return this.http.get<{
    not_approved_count
    : number }>(`${this.baseUrl}/requester-count`);
}

getPendingWorkersCount(): Observable<{ pending_workers_count: number }> {
  return this.http.get<{ pending_workers_count: number }>(`${this.baseUrl}/pending-workers-count`);
}
deleteWorkerJoin(joinedWorkerId: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/eventworker/delete/${joinedWorkerId}/`);
}



}
