import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Cinema } from '../models/cinema.model';

const DUMMY_CINEMAS: Cinema[] = [
    {
      id: 0,
      name: 'Ayala Malls - Glorietta',
      location: 'Makati',
    },
    {
      id: 1,
      name: 'Ayala Malls - Greenbelt',
      location: 'Makati',
    },
    {
      id: 2,
      name: 'SM Aura',
      location: 'Taguig',
    },
  ];

@Injectable({ providedIn: 'root' })
export class CinemasService {
  constructor() {}

  getCinemas() {
    return of(DUMMY_CINEMAS);
  }

  addCinema(cinema: Cinema) {
    return of(cinema);
  }

  deleteCinema(id: number) {
    return of(id);
  }

  updateCinema(updatedCinema: Cinema) {
    return of(updatedCinema);
  }
}
