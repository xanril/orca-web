import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, map, Observable } from 'rxjs';
import { Cinema } from '../../models/cinema.model';
import { Room } from '../../models/room.model';
import * as CinemasSelectors from '../../store/cinemas/cinema.selectors';
import * as RoomsSelectors from '../../store/rooms/rooms.selectors';

@Component({
  selector: 'app-cinema-detail',
  templateUrl: './cinema-detail.component.html',
})
export class CinemaDetailComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject<void>();
  cinema$: Observable<Cinema | undefined> = new Observable<Cinema | undefined>();
  rooms$: Observable<Room[]> = new Observable<Room[]>();

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.unsubscribe$),
        map((params) => {
          return +params['cinemaId'];
        }))
      .subscribe((cinemaId) => {
        this.cinema$ = this.store.select(CinemasSelectors.selectCinemaWithId(cinemaId));
        this.rooms$ = this.store.select(RoomsSelectors.selectRoomsWithCinemaId(cinemaId));
      });
  }
}
