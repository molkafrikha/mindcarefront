


import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../core/Services/auth-service.service';
import { Event } from '../../../core/models/event';
import { Device } from "@capacitor/device";
import { Geolocation } from '@capacitor/geolocation';
import { DeviceSpecService } from '../../../core/Services/device-spec.service';
import { Plugins } from "@capacitor/core";
import { EventService } from '../../../core/Services/event.service';
@Component({
  selector: 'app-all-event-not-joined',
  
  templateUrl: './all-event-not-joined.component.html',
  styleUrl: './all-event-not-joined.component.scss'
})
export class AllEventNotJoinedComponent implements OnInit {
  events: Event[] = [];
  displayedEvents: Event[] = [];
  allEvents: Event[] = [];
  displayedCount: number = 6;  // Nombre d'événements à afficher initialement
  message: string = '';
  workerId: any;
  specs: any = {};  // Pour stocker les spécifications de l'appareil
  
  constructor(
    private authservice: AuthServiceService,
    private deviceSpecService: DeviceSpecService,
    private eventservice : EventService
  ) {
    this.workerId = this.authservice.getUserId();  // Méthode pour obtenir l'ID du travailleur actuel
  }

  ngOnInit(): void {
    this.loadEvents();
  }
  deleteWorkerJoin(joinedWorkerId: number): void {
    this.eventservice.deleteWorkerJoin(joinedWorkerId).subscribe(
      (response) => {
        console.log('Worker join request deleted:', response);
        this.updateEventAfterDeletion(joinedWorkerId); // Update the event status or list of workers
      },
      (error) => {
        console.error('Error deleting worker join request:', error);
      }
    );
  }
  
  updateEventAfterDeletion(joinedWorkerId: number): void {
    // Find the event that contains the worker and update or remove the worker's join status
    this.displayedEvents.forEach((event) => {
      const workerIndex = event.joined_patients.findIndex(worker => worker.id === joinedWorkerId);
      if (workerIndex !== -1) {
        event.joined_patients[workerIndex].status = 'JOIN'; // Change the status to 'Join'
      }
    });
  }
  loadEvents(): void {
    this.eventservice.alleventnotJoined().subscribe(
      (response: Event[]) => {
        this.allEvents = response.filter(event => new Date(event.deadline) >= new Date());
        this.displayedEvents = this.allEvents.slice(0, this.displayedCount);
        this.getLocationDetails();
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }

  async getLocationDetails(): Promise<void> {
    console.log(this.displayedEvents)
    try {
      for (const event of this.displayedEvents) {
        if (event.location && typeof event.location === 'object') {
          const { lat, lng } = event.location; // Utilisez les noms corrects pour vos données

          // Validez que lat et lng sont des nombres valides
          if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
            console.log(`Processing event location: Lat: ${lat}, Lng: ${lng}`);
            await this.reverseGeocode(lat, lng, event);
          } else {
            console.warn('Invalid latitude or longitude:', lat, lng);
          }
        } else {
          console.warn('Event has no location data or incorrect format:', event);
        }
      }
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  }

  async reverseGeocode(lat: number, lng: number, event: Event): Promise<void> {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const locationData = await response.json();

      console.log('Reverse geocoding response:', locationData); // Log the response to verify

      if (response.ok) {
        event.address = locationData.display_name || 'Address unknown';
        event.city = locationData.address?.city ||
                     locationData.address?.town ||
                     locationData.address?.village ||
                     locationData.address?.county ||
                     'City unknown';
        event.country = locationData.address?.country || 'Country unknown';
        event.displayName = locationData.display_name
      } else {
        console.warn('Reverse geocoding failed:', locationData);
        event.address = 'Address unknown';
        event.city = 'City unknown';
        event.country = 'Country unknown';
      }
    } catch (error) {
      console.error('Error performing reverse geocoding:', error);
    }
  }

  showMoreEvents(): void {
    const currentLength = this.displayedEvents.length;
    const newLength = Math.min(currentLength + this.displayedCount, this.allEvents.length);
    this.displayedEvents = this.allEvents.slice(0, newLength);
  }

  isPatient(): boolean {
    return this.authservice.getRole() === 'Patient';
  }

  isAdmin(): boolean {
    return this.authservice.getRole() === 'Admin';
  }

  async getDeviceSpecs(): Promise<void> {
    try {
      // Récupérer les infos de l'appareil
      const deviceInfo = await Device.getInfo();
      if (deviceInfo) {
        this.specs.model = deviceInfo.model || 'Modèle inconnu';
        this.specs.manufacturer = deviceInfo.manufacturer || 'Fabricant inconnu';
        this.specs.platform = deviceInfo.platform || 'Plateforme inconnue';
      }

      // Récupérer les infos de géolocalisation
      const position = await Geolocation.getCurrentPosition();
      this.specs.geolocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      // Géocodage inverse pour obtenir les détails de l'adresse
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
      const locationData = await response.json();
      this.specs.address = locationData.display_name || 'Adresse inconnue';
      this.specs.city = locationData.address && (
        locationData.address.city ||
        locationData.address.town ||
        locationData.address.village ||
        locationData.address.county ||
        'Ville inconnue'
      );
      this.specs.country = locationData.address && locationData.address.country || 'Pays inconnu';

      // Récupérer des spécifications supplémentaires de l'appareil à partir de l'API
      await new Promise<void>((resolve, reject) => {
        this.deviceSpecService.getDeviceSpec(this.specs.model, this.specs.manufacturer).subscribe(
          data => {
            if (data && data.length > 0) {
              const deviceData = data[0];  // Supposons que l'API renvoie un tableau
              this.specs.front_camera_resolution = deviceData.front_camera_resolution || 'Caméra frontale inconnue';
              this.specs.rear_camera_resolution = deviceData.rear_camera_resolution || 'Caméra arrière inconnue';
              this.specs.operating_system = deviceData.operating_system || this.specs.platform;
            }
            console.log('Spécifications complètes de l\'appareil:', this.specs);
            resolve();
          },
          error => {
            console.error('Erreur lors de la récupération des spécifications de l\'appareil', error);
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des spécifications de l\'appareil:', error);
      throw error;
    }
  }

  joinEvent(event_id: number) {
    
      const requestBody = {
        worker_id: this.workerId,
        device_specs: this.specs
      };

      this.authservice.joinEvent(event_id, requestBody).subscribe(
        (response) => {
          this.message = response.message;
          this.loadEvents();  // Rafraîchir la liste des événements
        },
        (error) => {
          alert('Erreur lors de la participation à l\'événement');
        }
      );
    
  }

  getWorkerStatus(event: Event): string {
    if (this.workerId === null) {
      console.warn('L\'ID du travailleur est nul');
      return '';
    }

    // Trouver le travailleur dans joined_workers
    const worker = event.joined_patients.find((w) => w.patient_id === this.workerId);
    return worker ? worker.status : '';
  }
}

