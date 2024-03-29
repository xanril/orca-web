import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Cinema } from '../../../models/cinema.model';
import { Room } from '../../../models/room.model';
import * as CinemasSelector from '../../../store/cinemas/cinema.selectors';
import * as RoomsSelector from '../../../store/rooms/rooms.selectors';
import * as SchedulesPageSelectors from '../../store/schedules-page.selectors';

@Component({
  selector: 'app-schedules-side',
  templateUrl: './schedules-side.component.html',
})
export class SchedulesSideComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  cinemas$ = new Observable<Cinema[]>();
  rooms$ = new Observable<Room[]>();
  activeCinemaId$ = new Observable<number | null>();
  selectForm = new FormGroup({
    cinema: new FormControl(''),
    room: new FormControl(''),
  });

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cinemas$ = this.store.select(CinemasSelector.selectAllCinemas);
    this.activeCinemaId$ = this.store.select(SchedulesPageSelectors.selectActiveCinemaId);
    
    this.selectForm
      .get('cinema')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        if (!isNaN(data)) {
          this.selectForm.get('room')?.setValue('');
          this.rooms$ = this.store.select(RoomsSelector.selectRoomsWithCinemaId(data));
        }
      });

    this.selectForm
      .get('room')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        if (data !== '') {
          this.router.navigate(['schedules', 'room', data]);
        }
      });

    this.store
      .select(SchedulesPageSelectors.selectActiveCinemaId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cinemaId) => {
        console.log('cinema: ' + cinemaId);
        if (cinemaId != null) {
          this.selectForm.get('cinema')?.setValue(cinemaId);
        }
      });

    this.store
      .select(SchedulesPageSelectors.selectActiveRoomId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((roomId) => {
        console.log('room: ' + roomId);
        if (roomId != null) {
          this.selectForm.get('room')?.setValue(roomId);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
