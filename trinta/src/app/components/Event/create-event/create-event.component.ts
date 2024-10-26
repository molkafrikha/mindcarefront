import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../core/Services/auth-service.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-create-an-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit, OnDestroy {
  editor: Editor;
  html = '';

  eventData: any = {
    title: '',
    type: '',
    description: '',
    startdate: '',
    deadline: '',
    location: {
      lat: 24,  // Latitude initiale
      lng: 12,  // Longitude initiale
      placeId: ''
    },
    cost: null,
    numberOfPhotos: null,
    max_photos_per_worker: null,
  };

  map: L.Map;
  marker: L.Marker;

  startDateControl = new FormControl(null, [Validators.required, this.dateValidator.bind(this)]);
  deadlineControl = new FormControl(null, [Validators.required, this.dateValidator.bind(this)]);

  constructor(
    private eventService: AuthServiceService, 
    private router: Router, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.initMap(); // Initialiser la carte
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
  updateMarkerPosition(): void {
    // Cette méthode peut être utilisée pour mettre à jour l'état du marqueur ou pour des actions spécifiques
    console.log('Marker position updated');
    this.cdr.detectChanges();  // Déclencher manuellement la détection des changements
  }
  handleMapClick(e: L.LeafletMouseEvent): void {
    this.eventData.location.lat = e.latlng.lat;
    this.eventData.location.lng = e.latlng.lng;
    this.fetchPlaceId(e.latlng.lat, e.latlng.lng);

    if (this.marker) {
      this.marker.setLatLng(e.latlng);
    } else {
      this.marker = L.marker(e.latlng, { draggable: true }).addTo(this.map);
      this.marker.on('dragend', (event: L.DragEndEvent) => {
        const position = event.target.getLatLng();
        this.eventData.location.lat = position.lat;
        this.eventData.location.lng = position.lng;
        this.fetchPlaceId(position.lat, position.lng);
      });
    }

    this.map.setView(e.latlng, this.map.getZoom());
    this.cdr.detectChanges();  // Déclencher manuellement la détection des changements
  }

  initMap(): void {
    this.map = L.map('map').setView([this.eventData.location.lat, this.eventData.location.lng], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    const customIcon = L.icon({
      iconUrl: 'assets/images/marker.png',
      iconSize: [25, 41],  // Adjust size as needed
      iconAnchor: [12, 41]  // Adjust anchor point
    });
    this.marker = L.marker([this.eventData.location.lat, this.eventData.location.lng], {icon: customIcon, draggable: true }).addTo(this.map);
    this.marker.on('dragend', (event: L.DragEndEvent) => {
      const position = event.target.getLatLng();
      this.eventData.location.lat = position.lat;
      this.eventData.location.lng = position.lng;
      this.fetchPlaceId(position.lat, position.lng);
    });

    this.map.on('click', this.handleMapClick.bind(this));
  }

  fetchPlaceId(lat: number, lng: number): void {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then(response => response.json())
      .then(data => {
        this.eventData.location.placeId = data.place_id;
        this.cdr.detectChanges();  // Déclencher manuellement la détection des changements
      })
      .catch(error => {
        console.error('Error fetching placeId:', error);
      });
  }

  // Les autres méthodes restent inchangées

  isDateInFuture(date: Date | null): boolean {
    if (!date) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour éviter les problèmes de comparaison
    return date >= today;
  }

  isDatePassed(date: Date): boolean {
    const today = new Date();
    return date < today;
  }

  dateValidator(control: FormControl): { [key: string]: boolean } | null {
    if (control.value && this.isDatePassed(control.value)) {
      return { dateInPast: true };
    }
    return null;
  }

  validateDates(form: NgForm): void {
    if (this.startDateControl.value && this.deadlineControl.value && this.startDateControl.value > this.deadlineControl.value) {
      this.deadlineControl.setErrors({ deadlineBeforeStart: true });
    } else {
      this.deadlineControl.updateValueAndValidity();
    }
  }

  createEvent(eventForm: NgForm): void {
    this.validateDates(eventForm);

    if (eventForm.valid) {
      this.eventService.createEvent(this.eventData).subscribe(
        response => {
          console.log('Event created successfully:', response);
          this.eventData = {};  // Réinitialiser les données du formulaire
          this.html = '';  // Réinitialiser le contenu de l'éditeur
          eventForm.resetForm();  // Réinitialiser le formulaire
          this.router.navigate(['/Dashboard']);  // Rediriger vers le tableau de bord
        },
        error => {
          console.error('Error creating event:', error);
        }
      );
    }
  }
}
