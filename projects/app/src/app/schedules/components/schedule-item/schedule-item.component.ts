import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../../models/movie.model';
import { Schedule } from '../../../models/schedule.model';
import * as MoviesSelectors from '../../../store/movies/movies.selectors';
import * as SchedulesActions from '../../../store/schedules/schedules.actions';

@Component({
  selector: 'app-schedule-detail-item',
  templateUrl: './schedule-item.component.html',
  styles: [],
})
export class ScheduleItemComponent implements OnInit {
  @Input() schedule!: Schedule;
  @Input() schedules: Schedule[] | null = [];
  movie$ = new Observable<Movie>();
  movies$ = new Observable<Movie[]>();
  isFormShown = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.movie$ = this.store.select(MoviesSelectors.selectMovieWithId(this.schedule.movieId));
    this.movies$ = this.store.select(MoviesSelectors.selectMovies);
  }

  editHandler() {
    this.isFormShown = true;
  }

  deleteHandler() {
    this.store.dispatch(SchedulesActions.deleteSchedule({ id: this.schedule.id }));
  }

  cancelHandler() {
    this.isFormShown = false;
  }

  submitHandler(event: {
    startTime: Date;
    endTime: Date;
    movieId: number;
    ticketPrice: number;
  }) {

    const updatedSchedule: Schedule = {
      ...this.schedule,
      startTime: event.startTime,
      endTime: event.endTime,
      movieId: event.movieId,
      ticketPrice: event.ticketPrice
    };

    this.store.dispatch(SchedulesActions.updateSchedule({
      schedule: updatedSchedule
    }));
  }
}
