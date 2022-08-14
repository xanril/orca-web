import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from '../../../models/movie.model';
import { Schedule } from '../../../models/schedule.model';
import { DateHelperService } from '../../../services/date-helper.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styles: [],
})
export class ScheduleFormComponent implements OnInit, OnDestroy {
  @Input() schedule?: Schedule;
  @Input() schedules: Schedule[] | null = [];
  @Input() movies: Movie[] | null = [];
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<{
    startTime: Date;
    endTime: Date;
    movieId: number;
    ticketPrice: number;
  }>();
  unsubscribe$ = new Subject<void>();
  startTimeOptions: Date[] = [];
  ticketPriceOptions: number[] = [];
  scheduleForm = new FormGroup({
    time: new FormControl('', [Validators.required]),
    movie: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  constructor(private dateHelperService: DateHelperService) {}

  ngOnInit(): void {
    // initialize start time options
    this.startTimeOptions = this.dateHelperService.generateStartTimeOptions(
      this.schedule?.startTime ?? new Date(Date.now())
    );

    // initialize ticket price options
    for(let i = 200; i < 700; i = i + 50) {
      this.ticketPriceOptions.push(i);
    }

    this.scheduleForm.get('time')?.setValue(this.schedule?.startTime.toLocaleTimeString() ?? '');
    this.scheduleForm.get('movie')?.setValue(this.schedule?.movieId ?? '');
    this.scheduleForm.get('price')?.setValue(this.schedule?.ticketPrice ?? '');

    // we adjust the options available for the time selection whenever the movie changes.
    // this takes care of filtering schedule times so it does not conflict due to changes in
    // the movie's runtime / duration
    this.scheduleForm
      .get('movie')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.startTimeOptions = this.dateHelperService.generateStartTimeOptions(
          this.schedule?.startTime ?? new Date(Date.now())
        );
        this.startTimeOptions = this.startTimeOptions.filter((item) => {
          return this.isValidStartTime(item);
        });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  cancelHandler() {
    this.onCancel.emit();
  }

  submitHandler() {
    if (!this.scheduleForm.valid) {
      return;
    }

    const selectedTimeInForm = this.scheduleForm.get('time')?.value;
    const timeIndex = this.startTimeOptions.findIndex(
      (item) => item.toLocaleTimeString() === selectedTimeInForm
    );

    const selectedMovieId = +this.scheduleForm.get('movie')?.value;
    const selectedMovie = this.movies?.find((item) => item.id == selectedMovieId);
    const endTime = this.dateHelperService.calculateEndTime(
      this.startTimeOptions[timeIndex],
      selectedMovie?.runtime ?? 0
    );

    this.onSubmit.emit({
      startTime: this.startTimeOptions[timeIndex],
      endTime: endTime,
      movieId: +this.scheduleForm.get('movie')?.value,
      ticketPrice: +this.scheduleForm.get('price')?.value,
    });

    this.resetFormValues();
  }

  resetFormValues() {
    this.scheduleForm.get('time')?.setValue('');
    this.scheduleForm.get('movie')?.setValue('');
    this.scheduleForm.get('price')?.setValue('');
  }

  isValidStartTime(startTime: Date): boolean {
    // get selected movie
    const selectedMovieId = +this.scheduleForm.get('movie')?.value;
    const selectedMovie = this.movies?.find((item) => item.id == selectedMovieId);

    const maxCount = this.schedules?.length ?? 0;
    for (let i = 0; i < maxCount; i++) {
      const schedule = this.schedules![i];

      if (schedule.id == this.schedule?.id) {
        continue;
      }

      // if the start time + durationMs overlaps with the next schedule
      const durationMs = (selectedMovie?.runtime ?? 0) * 1000 * 60;
      const comparedDate = new Date(schedule.startTime.getTime() - durationMs);
      if (this.dateHelperService.checkIfTimeBound(startTime, comparedDate, schedule.startTime)) {
        return false;
      }

      // if startTime is within the timespan of scheduled movie
      if (
        this.dateHelperService.checkIfTimeBound(startTime, schedule.startTime, schedule.endTime)
      ) {
        return false;
      }
    }

    return true;
  }
}
