import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, map, Observable } from 'rxjs';
import { Schedule } from '../../models/schedule.model';
import * as SchedulesSelectors from '../../store/schedules/schedules.selectors';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styles: [],
})
export class ScheduleDetailComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  schedules$ = new Observable<Schedule[]>();

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.unsubscribe$),
        map((params) => {
          const cinemaId = +params['cinemaId'];
          const roomId = +params['roomId'];
          return { cinemaId, roomId };
        })
      )
      .subscribe(({ cinemaId, roomId }) => {
        this.schedules$ = this.store.select(
          SchedulesSelectors.selectSchedulesWithCinemaIdAndRoomId(
            cinemaId,
            roomId
          )
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
