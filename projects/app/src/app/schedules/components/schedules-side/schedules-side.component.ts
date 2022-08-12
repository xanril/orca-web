import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, map } from 'rxjs';
import { Cinema } from '../../../models/cinema.model';
import { Room } from '../../../models/room.model';
import * as CinemasSelector from '../../../store/cinemas/cinema.selectors';
import * as RoomsSelector from '../../../store/rooms/rooms.selectors';
import * as SchedulesPageActions from '../../store/schedules-page.actions';
import * as SchedulesPageSelectors from '../../store/schedules-page.selectors';

@Component({
  selector: 'app-schedules-side',
  templateUrl: './schedules-side.component.html',
})
export class SchedulesSideComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  cinemas$ = new Observable<Cinema[]>();
  rooms$ = new Observable<Room[]>();
  selectForm = new FormGroup({
    cinema: new FormControl(''),
    room: new FormControl(''),
  });

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cinemas$ = this.store.select(CinemasSelector.selectAllCinemas);

    this.selectForm
      .get('cinema')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        if (!isNaN(data)) {
          this.selectForm.get('room')?.setValue('');

          this.store.dispatch(SchedulesPageActions.setActiveCinemaId({ id: +data }));

          this.store.dispatch(SchedulesPageActions.resetActiveRoomId());

          this.rooms$ = this.store.select(RoomsSelector.selectRoomsWithCinemaId(data));
        }
      });

    this.selectForm
      .get('room')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        if (data !== '') {
          this.store.dispatch(SchedulesPageActions.setActiveRoomId({ id: +data }));

          const cinemaId = this.selectForm.get('cinema')?.value;
          this.router.navigate(['schedules', 'cinema', cinemaId, 'room', data]);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
