import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
})
export class WeekCalendarComponent implements OnInit {
  activeDayOffset: number = 0;
  dayItems = [0, 1, 2, 3, 4, 5, 6];

  constructor() {}

  ngOnInit(): void {}

  dayClickHandler(dayOffset: number) {
    this.activeDayOffset = dayOffset;
  }
}
