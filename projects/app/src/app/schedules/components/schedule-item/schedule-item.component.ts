import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Movie } from '../../../models/movie.model';
import { Schedule } from '../../../models/schedule.model';
import { DateHelperService } from '../../../services/schedule-date.service';
import * as MoviesSelectors from '../../../store/movies/movies.selectors';
import * as SchedulesActions from '../../../store/schedules/schedules.actions';

@Component({
  selector: 'app-schedule-detail-item',
  templateUrl: './schedule-item.component.html',
  styles: [],
})
export class ScheduleItemComponent implements OnInit {
  @Input() schedule!: Schedule;
  @Input() movies: Movie[] | null = [];
  @Input() schedules: Schedule[] | null = [];
  unsubscribe$ = new Subject<void>();
  startTimeOptions: Date[] = [];
  movie$ = new Observable<Movie>();
  isFormShown = false;
  scheduleForm = new FormGroup({
    time: new FormControl('', [Validators.required]),
    movie: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store, private dateHelperService: DateHelperService) {}

  ngOnInit(): void {
    this.movie$ = this.store.select(MoviesSelectors.selectMovieWithId(this.schedule.movieId));

    this.scheduleForm
      .get('movie')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.startTimeOptions = this.dateHelperService.generateStartTimeOptions(
          this.schedule.startTime
        );
        this.startTimeOptions = this.startTimeOptions.filter((item) => {
          return this.isValidTime(item);
        });
      });
  }

  editHandler() {
    this.isFormShown = true;

    this.scheduleForm.get('time')?.setValue(this.schedule.startTime.toLocaleTimeString());
    this.scheduleForm.get('movie')?.setValue(this.schedule.movieId);
    this.scheduleForm.get('price')?.setValue(this.schedule.ticketPrice);
  }

  deleteHandler() {
    this.store.dispatch(SchedulesActions.deleteSchedule({ id: this.schedule.id }));
  }

  cancelHandler() {
    this.isFormShown = false;
  }

  isValidTime(startTime: Date): boolean {
    // get selected movie
    const selectedMovieId = +this.scheduleForm.get('movie')?.value;
    const selectedMovie = this.movies?.find((item) => item.id == selectedMovieId);

    const maxCount = this.schedules?.length ?? 0;
    for (let i = 0; i < maxCount; i++) {
      const schedule = this.schedules![i];

      if (schedule.id == this.schedule.id) {
        continue;
      }

      // if the start time + durationMs overlaps with the next schedule
      const durationMs = (selectedMovie?.runtime ?? 0) * 1000 * 60;
      const comparedDate = new Date(schedule.startTime.getTime() - durationMs);
      if (
        startTime.getTime() >= comparedDate.getTime() &&
        startTime.getTime() <= schedule.startTime.getTime()
      ) {
        return false;
      }

      // if startTime is within the timespan of scheduled movie
      if (
        startTime.getTime() >= schedule.startTime.getTime() &&
        startTime.getTime() <= schedule.endTime.getTime()
      ) {
        return false;
      }
    }

    return true;
  }

  submitHandler() {
    if (!this.scheduleForm.valid) {
      return;
    }
  }
}
