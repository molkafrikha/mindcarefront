import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { AuthServiceService } from '../../core/Services/auth-service.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
    authForm: FormGroup;
    email: string;
    message: string;

    constructor(
        private fb: FormBuilder,
        private forgetPasswordService: AuthServiceService
    ) {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        if (this.authForm.valid) {
            this.email = this.authForm.value.email;
            this.forgetPasswordService.requestPasswordReset(this.email).subscribe(
                response => {
                    this.message = 'Password reset email sent successfully.';
                },
                error => {
                    console.error('Error:', error);
                    this.message = 'Failed to send password reset email. Please try again.';
                }
            );
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }
}
