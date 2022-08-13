import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { ListMenuItemComponent } from './list-menu-item/list-menu-item.component';
import { WeekCalendarComponent } from './week-calendar/week-calendar.component';
import { DayCalendarComponent } from './day-calendar/day-calendar.component';

@NgModule({
  declarations: [
    PaginationComponent,
    ListMenuItemComponent,
    WeekCalendarComponent,
    DayCalendarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent,
    ListMenuItemComponent,
    WeekCalendarComponent
  ]
})
export class SharedModule { }