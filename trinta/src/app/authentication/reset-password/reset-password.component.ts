import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthServiceService } from '../../core/Services/auth-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  hide2 = true;
  setPasswordForm: FormGroup;
  message: string = '';
  userId: number | null = null;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private passwordResetService: AuthServiceService,
    private router: Router
  ) {
    this.setPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('user_id');
      const token = params.get('token');
      
      if (userId && token) {
        this.userId = +userId; // Convert userId to number
        this.token = token;
      } else {
        this.message = 'Invalid password reset link';
      }
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.setPasswordForm.valid) {
      const { password, confirmPassword } = this.setPasswordForm.value;

      if (this.userId !== null) {
        this.passwordResetService.changePassword(this.userId, password, confirmPassword).subscribe(
          response => {
            this.message = 'Password changed successfully';
            this.router.navigate(['/authentication']);
          },
          error => {
            this.message = 'Error setting new password';
          }
        );
      } else {
        this.message = 'Invalid user ID or token';
      }
    }
  }
}
