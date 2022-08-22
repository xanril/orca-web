import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Movie } from '../../../models/movie.model';
import { Schedule } from '../../../models/schedule.model';
import * as SchedulesActions from '../../../store/schedules/schedules.actions';

@Component({
  selector: 'app-add-schedule-item',
  templateUrl: './add-schedule-item.component.html',
  styleUrls: ['./add-schedule-item.component.css'],
})
export class AddScheduleItemComponent implements OnInit {
  @Input() schedules: Schedule[] | null = [];
  @Input() movies: Movie[] | null = [];
  @Input() activeRoomId: number = 0;
  @Input() activeDayIndex: number | null = 0;
  isFormShown: boolean = false;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  showFormHandler() {
    this.isFormShown = true;
  }

  cancelHandler() {
    this.isFormShown = false;
  }

  submitHandler(event: { startTime: Date; endTime: Date; movieId: number; ticketPrice: number }) {
    const newSchedule: Schedule = {
      id: -1,
      roomId: this.activeRoomId,
      dayOfWeek: this.activeDayIndex ?? 0,
      movieId: event.movieId,
      startTime: event.startTime,
      endTime: event.endTime,
      ticketPrice: event.ticketPrice
    };

    this.store.dispatch(SchedulesActions.addSchedule({
      schedule: newSchedule
    }));

    this.isFormShown = false;
  }
}
