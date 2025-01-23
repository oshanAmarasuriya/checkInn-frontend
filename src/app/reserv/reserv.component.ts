import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestManager } from '../services/request-manager'
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-reserv',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reserv.component.html',
  styleUrl: './reserv.component.css'
})
export class ReservComponent {
  reservationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private requestManager: RequestManager,
    private router: Router // Optional: For navigation after submission
  ) {
    // Initialize the form group with form controls
    this.reservationForm = this.fb.group({
      branch: ['', Validators.required],
      people: ['', [Validators.required, Validators.min(1)]],
      nights: ['', [Validators.required, Validators.min(1)]],
      rooms: ['', [Validators.required, Validators.min(1)]],
    });
  }

  // Method to handle form submission
  onSubmit(event: Event): void {
    event.preventDefault(); // Prevents default form submission behavior
  
    if (this.reservationForm.valid) {
      const formData = this.reservationForm.value;
  
      this.requestManager.sendReservData(formData).subscribe(
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
      alert('Please fill out all required fields correctly.');
    }
  }
  
}
