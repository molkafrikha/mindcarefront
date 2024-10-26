import { Component } from '@angular/core';
import { AuthServiceService } from '../../core/Services/auth-service.service'; // Update with the correct path
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  hide = true;
  hide2 = true;
  hide3 = true;

 
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthServiceService, private snackBar: MatSnackBar) {}

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      // Handle password mismatch
      console.error('Passwords do not match');
      this.snackBar.open('Passwords do not match', 'Close', { duration: 3000 });
      return;
    }

    const userId = this.authService.getUserId();
    if (!userId) {
      // Handle case where user ID is not available
      console.error('User ID is not available');
      this.snackBar.open('User ID is not available', 'Close', { duration: 3000 });
      return;
    }

    this.authService.changePassword(Number(userId), this.newPassword, this.confirmPassword)
      .subscribe(
        response => {
          // Handle success
          if (response) {
            this.snackBar.open(response.message, 'Close', { duration: 3000 });
          } else {
            // Handle case where backend returns an error message
            this.snackBar.open('Failed to change password', 'Close', { duration: 3000 });
          }
        },
        error => {
          // Handle error
          console.error(error);
          this.snackBar.open('An error occurred while changing password', 'Close', { duration: 3000 });
        }
      );
  }
}
