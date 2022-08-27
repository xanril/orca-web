import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cinema } from '../models/cinema.model';

@Injectable({ providedIn: 'root' })
export class CinemasService {
  constructor(private http: HttpClient) {}

  getCinemas() {
    return this.http.get<Cinema[]>(environment.apiBaseUrl + '/cinemas');
  }

  addCinema(cinema: Cinema) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<Cinema>(environment.apiBaseUrl + '/cinema', JSON.stringify(cinema), {
      headers: headers,
    });
  }

  deleteCinema(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.delete<number>(environment.apiBaseUrl + '/cinema/' + id).pipe(
      map((response) => {
        return id;
      })
    );
  }

  updateCinema(updatedCinema: Cinema) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http
      .put<Cinema>(
        environment.apiBaseUrl + '/cinema/' + updatedCinema.id,
        JSON.stringify(updatedCinema),
        {
          headers: headers,
        }
      )
      .pipe(
        map((response) => {
          return updatedCinema;
        })
      );
  }
}
