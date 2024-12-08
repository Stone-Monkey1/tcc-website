import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import * as bootstrap from 'bootstrap'; // Import Bootstrap JavaScript

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule], // Include HttpClientModule
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  estimateForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.estimateForm = this.fb.group({
      name: ['thomason_construction_company'],
      formTitle: ['thomason_construction_company'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      zip: ['', Validators.required],
      workType: ['', Validators.required],
      jobDescription: [''],
    });
  }

  onSubmit(): void {
    if (this.estimateForm.valid) {
      const formData = this.estimateForm.value;

      // Send the form data to the backend
      this.http.post('https://tcc-website-q9vq.onrender.com/send-email', formData).subscribe(
        (response) => {
          console.log('Email sent successfully:', response);
          this.showModal();
        },
        (error) => {
          console.error('Error sending email:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
  showModal(): void {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}