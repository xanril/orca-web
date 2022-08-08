import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, map, switchMap } from 'rxjs';
import { Cinema } from '../../models/cinema.model';
import * as CinemasSelectors from '../../store/cinemas/cinema.selectors';

@Component({
  selector: 'app-cinema-detail',
  templateUrl: './cinema-detail.component.html',
})
export class CinemaDetailComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject<void>();
  cinema!: Cinema;
  
  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.unsubscribe$),
        map((params) => {
          return +params['cinemaId'];
        }),
        switchMap((cinemaId) => {
          return this.store.select(CinemasSelectors.selectCinemaWithId(cinemaId));
        })
      )
      .subscribe((cinema) => {
        this.cinema = cinema;
      });
  }
}
