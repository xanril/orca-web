import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, map, Observable } from 'rxjs';
import { Schedule } from '../../models/schedule.model';
import { Movie } from '../../models/movie.model';
import * as SchedulesPageSelectors from '../store/schedules-page.selectors';
import * as SchedulesPageActions from '../store/schedules-page.actions';
import * as MoviesSelectors from '../../store/movies/movies.selectors';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
})
export class ScheduleDetailComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  schedules$ = new Observable<Schedule[]>();
  movies$ = new Observable<Movie[]>();
  activeDayIndex$ = new Observable<number>();

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
        this.store.dispatch(
          SchedulesPageActions.setActiveCinemaId({
            id: cinemaId,
          })
        );

        this.store.dispatch(
          SchedulesPageActions.setActiveRoomId({
            id: roomId,
          })
        );
      });

    this.schedules$ = this.store.select(SchedulesPageSelectors.selectSchedulesForActiveDay);
    this.activeDayIndex$ = this.store.select(SchedulesPageSelectors.selectActiveDayIndex);
    this.movies$ = this.store.select(MoviesSelectors.selectMovies);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  dayItemClickHandler(dayIndex: number) {
    this.store.dispatch(
      SchedulesPageActions.setActiveDayIndex({
        dayIndex: dayIndex,
      })
    );
  }
}
