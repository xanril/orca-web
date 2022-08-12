import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-day-calendar',
  templateUrl: './day-calendar.component.html',
  styleUrls: ['./day-calendar.component.css'],
})
export class DayCalendarComponent implements OnInit {
  @Input() dateOffset: number = 0;
  @Input() isActive: boolean = false;
  @Output() onClick = new EventEmitter<number>();

  targetDate = new Date(Date.now());

  constructor() {}

  ngOnInit(): void {
    // adjust the date given the input offset value
    this.targetDate = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * this.dateOffset
    );
  }

  clickHandler() {
    this.onClick.emit(this.dateOffset);
  }
}
