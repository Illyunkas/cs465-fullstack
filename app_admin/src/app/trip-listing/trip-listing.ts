import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';
import { TripData } from '../services/trip-data';
import { trips as sampleTrips } from '../data/trips';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  message = 'Loading trips...';
  isLoading = false;
  errorDetail = '';

  constructor(
    private tripDataService: TripData,
    private authentication: Authentication,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getStuff();
  }

  private getStuff(): void {
    this.isLoading = true;
    this.errorDetail = '';

    setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = false;
        this.message = 'Still waiting for API response...';
        this.errorDetail = 'Check that Express is running on port 3000 and restart Angular dev server from app_admin so proxy /api routes are active.';
        this.cdr.detectChanges();
      }
    }, 8000);

    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.isLoading = false;

        if (!Array.isArray(value)) {
          this.showSampleTrips();
          this.cdr.detectChanges();
          return;
        }

        this.trips = value;
        if (value.length > 0) {
          this.message = `There are ${value.length} trips available.`;
        } else {
          this.message = 'There were no trips retrieved from the database.';
        }

        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.isLoading = false;
        console.log('Error:', error);
        this.showSampleTrips();
        this.cdr.detectChanges();
      },
    });
  }

  private showSampleTrips(): void {
    this.trips = sampleTrips.map((trip) => ({ ...trip }));
    this.message = `Showing ${this.trips.length} sample trips.`;
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  isLoggedIn(): boolean {
    return this.authentication.isLoggedIn();
  }
}
