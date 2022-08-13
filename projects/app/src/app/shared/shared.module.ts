import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { ListMenuItemComponent } from './list-menu-item/list-menu-item.component';
import { WeekCalendarComponent } from './week-calendar/week-calendar.component';
import { DayCalendarComponent } from './day-calendar/day-calendar.component';
import { EditDeleteButtonsComponent } from './edit-delete/edit-delete-buttons.component';

@NgModule({
  declarations: [
    PaginationComponent,
    ListMenuItemComponent,
    WeekCalendarComponent,
    DayCalendarComponent,
    EditDeleteButtonsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent,
    ListMenuItemComponent,
    WeekCalendarComponent,
    EditDeleteButtonsComponent
  ]
})
export class SharedModule { }
