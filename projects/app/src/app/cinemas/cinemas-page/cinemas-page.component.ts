import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cinema } from '../../models/cinema.model';
import * as CinemasSelectors from '../../store/cinemas/cinema.selectors';
import * as CinemasPageSelectors from '../store/cinemas-page.selectors';

@Component({
  selector: 'app-manage-cinema',
  templateUrl: './cinemas-page.component.html',
})
export class CinemasPageComponent implements OnInit {
  cinemas$: Observable<Cinema[]> = new Observable<Cinema[]>();
  activeCinemaId$: Observable<number> = new Observable<number>();

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.cinemas$ = this.store.select(CinemasSelectors.selectAllCinemas);
    this.activeCinemaId$ = this.store.select(CinemasPageSelectors.selectActiveCinemaId);
  }
}
