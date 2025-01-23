import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestManager } from '../services/request-manager'
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  
  contactForm: FormGroup;

  constructor(private fb: FormBuilder,private requestManager: RequestManager,) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formValues = this.contactForm.value;
      console.log('Form Data:', formValues);
      this.requestManager.sendContactData(formValues).subscribe(
        (response) => {
          console.log('Reservation successful:', response);
          alert('Reservation successful!');
        },
        (error) => {
          console.error('Error during reservation:', error);
          alert('Failed to make the reservation. Please try again.');
        }
      );
    } else {
      alert('Form is invalid')
      console.log('Form is invalid');
    }
  }

}
