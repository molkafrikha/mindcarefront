import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule, NgIf } from '@angular/common';
import { AuthServiceService } from '../../core/Services/auth-service.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  showAlert: boolean = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthServiceService,
        private _snackBar: MatSnackBar,

    ) {
        this.authForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(3)]],
        });
      }

      // Password Hide
      hide = true;

      // Form
      authForm: FormGroup;
      error: string;
  signIn(): void
  {
    // Return if the form is invalid
    if ( this.authForm.invalid )
    {
      return;
    }

    // Disable the form
    this.authForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign in
    this.authService.login(this.authForm.value.email,this.authForm.value.password)
      .subscribe(
        res =>
        {
          console.log(res)

          // Redirect to the attempted URL, or to the default URL if no attempted URL was found

          if (res.msg !='Login Success'){
            this.authForm.enable();

            this.authForm.reset();

            this.showNotification('snackbar-error', res.msg, 'bottom', 'center');


            // Show the alert
            this.showAlert = true;
          }
          else{
            this.showNotification('snackbar-error', 'Login Success', 'bottom', 'center');
            this.router.navigate(['/Dashboard']);
          }
        }
      );
  }
  showNotification(colorName: string, text: string, placementFrom: MatSnackBarVerticalPosition, placementAlign: MatSnackBarHorizontalPosition) {
    this._snackBar.open(text, 'close', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
      onSubmit() {
        if (this.authForm.valid) {
          const credentials = this.authForm.value;
          this.authService.login(this.authForm.value.email,this.authForm.value.password).subscribe(
            () => {
              const userId = this.authService.getUserId();
              console.log('User ID:', userId);
              this.router.navigate(['/Dashboard']); // Redirection après login réussi
            },
            (error) => {
              console.error('Login error:', error);
              if (error && error.error && error.error.message === 'Invalid credentials') {
                this.error = 'Invalid email or password'; // Message d'erreur spécifique à afficher
              } else {
                this.error = 'Invalid email or password'; // Autre type d'erreur
              }
            }
          );
        } else {
          console.log('Form is invalid. Please check the fields.');
        }
      }
    }
