import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { AuthServiceService } from '../../core/Services/auth-service.service';

@Component({
    selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
    message: string | null = null;
    authForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthServiceService
    ) {
        this.authForm = this.fb.group({
            fullName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            mobile_phone: ['', [Validators.required, Validators.minLength(8)]],
            location: ['', [Validators.required]],
            role: ['Requester'],
            organization_name:['', [Validators.required]],
        });
    }

    // Password Hide
    hide = true;

    // Form
    onSubmit() {
        if (this.authForm.valid) {
            this.authService.registerRequester(this.authForm.value).subscribe(
                (response) => {
                    this.message = 'Your account is pending approval from the admin. Once approved, you will receive a verification email';
                },
                (error) => {
                    console.error('Error during registration:', error);
                }
            );
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }
}
