import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
	providedIn: 'root'
})
export class TripData {
	private url = '/api/trips';

	constructor(private http: HttpClient) {}

	getTrips(): Observable<Trip[]> {
		return this.http.get<Trip[]>(this.url);
	}

	getTrip(tripCode: string): Observable<Trip> {
		return this.http.get<Trip>(`${this.url}/${tripCode}`);
	}

	addTrip(formData: Trip): Observable<Trip> {
		return this.http.post<Trip>(this.url, formData);
	}

	updateTrip(tripCode: string, formData: Trip): Observable<Trip> {
		return this.http.put<Trip>(`${this.url}/${tripCode}`, formData);
	}

	deleteTrip(tripCode: string): Observable<{ message: string }> {
		return this.http.delete<{ message: string }>(`${this.url}/${tripCode}`);
	}
}
