import { Component, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements AfterViewInit {
  estimateForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.estimateForm = this.fb.group({
      name: ['thomason_construction_company'],
      formTitle: ['thomason_construction_company'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      preferredContact: ['email', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\d{10}$/)]],
      zip: ['', Validators.required],
      workType: ['', Validators.required],
      jobDescription: [''],
    });
  }

  ngAfterViewInit(): void {
    this.initializePreferredContactButtons();
    this.updateContactMethod('email');
  }

  onSubmit(): void {
    if (this.estimateForm.valid) {
      const formData = { ...this.estimateForm.value };
      formData.phone = this.formatPhone(formData.phone); // Format phone

      console.log('Formatted Form Data Sent to Backend:', formData);

      this.http
        .post('https://tcc-website-q9vq.onrender.com/send-email', formData)
        .subscribe(
          (response) => {
            console.log('Email sent successfully:', response);
            this.showModal();
          },
          (error) => {
            console.error('Error sending email:', error);
          }
        );
    } else {
      console.error('Form is invalid:', this.estimateForm.errors);
    }
  }

  formatPhone(phone: string): string {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }

  showModal(): void {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  updateContactMethod(selectedMethod: string): void {
    this.estimateForm.patchValue({ preferredContact: selectedMethod });

    // Update validators dynamically
    if (selectedMethod === 'email') {
      this.estimateForm
        .get('email')
        ?.setValidators([Validators.required, Validators.email]);
      this.estimateForm.get('phone')?.clearValidators();
    } else if (selectedMethod === 'phone') {
      this.estimateForm
        .get('phone')
        ?.setValidators([Validators.required, Validators.pattern(/^\d{10}$/)]);
      this.estimateForm.get('email')?.clearValidators();
    }

    // Update the validity of the form controls
    this.estimateForm.get('email')?.updateValueAndValidity();
    this.estimateForm.get('phone')?.updateValueAndValidity();

    console.log('Selected Contact Method:', selectedMethod); // Debugging

    // Update UI styles
    const emailField = document.getElementById('email') as HTMLInputElement;
    const phoneField = document.getElementById(
      'phone-number'
    ) as HTMLInputElement;
    const emailButton = document.querySelector(
      '.preferred-contact-button-container a:first-of-type'
    ) as HTMLAnchorElement;
    const phoneButton = document.querySelector(
      '.preferred-contact-button-container a:nth-of-type(2)'
    ) as HTMLAnchorElement;

    if (selectedMethod === 'email') {
      emailField.style.borderColor = 'rgb(23, 123, 78)';
      phoneField.style.borderColor = '#ccc';
      emailButton.style.background = 'rgb(23, 123, 78)';
      emailButton.style.color = 'white';
      phoneButton.style.background = 'initial';
      phoneButton.style.color = 'white';
    } else if (selectedMethod === 'phone') {
      phoneField.style.borderColor = 'rgb(23, 123, 78)';
      emailField.style.borderColor = '#ccc';
      phoneButton.style.background = 'rgb(23, 123, 78)';
      phoneButton.style.color = 'white';
      emailButton.style.background = 'initial';
      emailButton.style.color = 'white';
    }
  }

  initializePreferredContactButtons(): void {
    const emailButton = document.getElementById('email-required');
    const phoneButton = document.getElementById('phone-required');

    emailButton?.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      this.updateContactMethod('email');
    });

    phoneButton?.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      this.updateContactMethod('phone');
    });

    // Set initial state
    if (this.estimateForm.get('preferredContact')?.value === 'email') {
      this.updateContactMethod('email');
    }
  }
}
