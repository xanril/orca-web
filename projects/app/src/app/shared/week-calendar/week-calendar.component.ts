import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
})
export class WeekCalendarComponent implements OnInit {
  @Input() activeDayOffset: number = 0;
  @Output() onDayItemClick = new EventEmitter<number>();
  dayItems = [0, 1, 2, 3, 4, 5, 6];

  constructor() {}

  ngOnInit(): void {}

  dayClickHandler(dayOffset: number) {
    this.onDayItemClick.emit(dayOffset);
  }
}
