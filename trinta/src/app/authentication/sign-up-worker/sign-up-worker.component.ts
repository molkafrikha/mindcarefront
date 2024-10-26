import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../core/Services/auth-service.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up-worker.component.html',
  styleUrls: ['./sign-up-worker.component.scss'],
})
export class SignUpWorkerComponent {
  authForm: FormGroup;
  hide = true; // For password visibility toggle
  currentLocation: { latitude: number; longitude: number } | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
  ) {
    this.authForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      mobile_phone: ['', [Validators.required, Validators.minLength(8)]],
      gender: ['', Validators.required], // Assuming you have gender as a select input
    });

    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    const permissions = await Geolocation.requestPermissions();
    if (permissions.location === 'granted') {
      const position = await Geolocation.getCurrentPosition();
      this.currentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } else {
      console.error('Location permission not granted');
    }
  }

  onSubmit() {
    if (this.authForm.invalid) {
      // If the form is invalid, mark all fields as touched to display validation errors
      this.authForm.markAllAsTouched();
      return;
    }

    // Construct the request body
    const fullBody = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
      fullName: this.authForm.value.fullName,
      mobile_phone: this.authForm.value.mobile_phone,
      gender: this.authForm.value.gender === 'M' ? 'male' : 'female',// Use the selected gender value
      date_of_birth: "2000-02-09", // Replace with dynamic value if needed
      location: this.currentLocation, // Include location if necessary
      is_Patient: true,
      is_active: false,
      role: 'Patient',
    };

    this.authService.registerWorker(fullBody).subscribe(
      (response) => {
        console.log('Enregistrement réussi:', response);
        this.router.navigate(['/authentication']);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement:', error);
        // Handle error response and notify the user appropriately
        // You might want to show a message to the user based on error status
      }
    );
  }
}
