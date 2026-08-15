import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  formError = '';
  isSubmitting = false;

  constructor(
    private authentication: Authentication,
    private router: Router,
  ) {}

  submit(): void {
    this.formError = '';
    if (!this.email || !this.password) {
      this.formError = 'Email and password are required.';
      return;
    }

    this.isSubmitting = true;
    this.authentication.login(this.email, this.password).subscribe({
      next: ({ token }) => {
        this.authentication.saveToken(token);
        this.router.navigate(['/']);
      },
      error: () => {
        this.isSubmitting = false;
        this.formError = 'Unable to sign in with those credentials.';
      },
    });
  }
}