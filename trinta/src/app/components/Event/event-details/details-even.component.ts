import { AuthServiceService } from './../../../core/Services/auth-service.service';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../core/Services/event.service';
import * as tf from '@tensorflow/tfjs';
import { EmbeddingService } from "../../../core/Services/embeddingService";
import { DomSanitizer } from "@angular/platform-browser";
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Capacitor } from "@capacitor/core";
import { SubmissionService } from "../../../core/Services/submission.service";
import { interval } from "rxjs";
import { switchMap } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

declare var navigator: any; // Declare navigator to use Cordova's accelerometer

@Component({
  selector: 'app-details-even',
  templateUrl: './details-even.component.html',
  styleUrls: ['./details-even.component.scss']
})
export class DetailsEvenComponent implements OnInit {
  
  comments: any[] = [];
  paginatedComments: Comment[] = []; // Array to hold comments for the current page
  pageSize = 5;
  pageIndex = 0;
  
  maxPhotos: number = 0;
  eventDetails: any;
  
  address: string;
  latitude: number;
  longitude: number;
  
  private embedding: any;
  submitted: boolean = false;
  
  
  
  dataSource = new MatTableDataSource([]);
  eventId: any;
 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  content: string = '';
  patientId: string | null = null; // Initialize as null or a string based on your logic
  patientName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private authservice: AuthServiceService,
    private embeddingService: EmbeddingService,
    private cdr: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    private submissionService: SubmissionService,
    private router: Router
  ) {
   
  }

  async ngOnInit() {
    
    this.patientId = this.authservice.getUserId();
    const eventId = this.route.snapshot.paramMap.get('id');
    this.eventId = eventId;

    // Check if eventId is defined
    if (!this.eventId) {
      console.error('Event ID is undefined');
      return; // Stop further execution if the ID is not available
    }

    

    this.eventService.geteventById(this.eventId).subscribe(async (data) => {
      console.log(data);
      this.eventDetails = data;

      if (localStorage.getItem('role') === 'Worker') {
        console.log("here");
        this.eventService.getWorkerEventStatus(data.id).subscribe(res => {
          console.log(res);
          if (res.status === 'APPROVED') {
            console.log('true');
            
            
            this.cdr.detectChanges();
          }
        });
      }
      
      this.maxPhotos = data.max_photos_per_worker;
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.location.lat}&lon=${data.location.lng}`);
      const locationData = await response.json();
      this.address = locationData.display_name;
      this.latitude = data.location.lat;
      this.longitude = data.location.lng;
    });

    try {
      const modelUrl = 'assets/encoder/model.json';
      
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading model:', error);
    }
    this.loadComments();
  }

  isRequester(): boolean {
    return this.authservice.getRole() === 'Requester';
  }

  isPatient(): boolean {
    return this.authservice.getRole() === 'Patient';
  }

  isAdmin(): boolean {
    return this.authservice.getRole() === 'Admin';
  }

  viewDetails(title: string) {
    this.router.navigate([`/submissions/event/${this.eventId}`], {
      queryParams: { event_name: title }
    });
  }

  loadComments(): void {
    if (!this.eventId) {
      console.log('Cannot load comments: eventId is undefined');
      return;
    }
  
    this.eventService.getComments(this.eventId).subscribe(
      (data) => {
        this.comments = data;
        this.cdr.detectChanges(); // Forcer la détection des changements
      },
      (error) => {
        console.log('Erreur lors du chargement des commentaires', error);
      }
    );
  }
  getSentimentEmoji(sentiment: string): string {
    switch (sentiment) {
      case 'positive':
        return '😊'; // Smiley heureux
      case 'negative':
        return '😠'; // Smiley fâché
      case 'neutral':
        return '😐'; // Smiley neutre
      default:
        return ''; // Aucun smiley si le sentiment n'est pas reconnu
    }
  }

  isDoctor(): boolean {
    return this.authservice.getRole() === 'Doctor';
  }
  submitComment() {
    if (this.content.trim() === '') {
      return;
    }
  
    this.eventService.sendComment(this.eventId, this.patientId, this.content).subscribe(
      response => {
        console.log('Comment submitted successfully:', response);
        
        // Add the new comment to the local comments array
        this.comments.push({
          content: this.content,
          // Include any other fields returned by the response if needed
        });
  
        this.content = ''; // Clear the input after submission
        this.cdr.detectChanges(); // Trigger change detection
      },
      error => {
        console.error('Error submitting comment:', error);
      }
    );
  }
}
