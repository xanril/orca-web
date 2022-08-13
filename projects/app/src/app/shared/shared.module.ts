import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { ListMenuItemComponent } from './list-menu-item/list-menu-item.component';
import { WeekCalendarComponent } from './week-calendar/week-calendar.component';
import { DayCalendarComponent } from './day-calendar/day-calendar.component';
import { EditDeleteButtonsComponent } from './edit-delete/edit-delete-buttons.component';
import { SubmitCancelButtonsComponent } from './submit-cancel-buttons/submit-cancel-buttons.component';

@NgModule({
  declarations: [
    PaginationComponent,
    ListMenuItemComponent,
    WeekCalendarComponent,
    DayCalendarComponent,
    EditDeleteButtonsComponent,
    SubmitCancelButtonsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent,
    ListMenuItemComponent,
    WeekCalendarComponent,
    EditDeleteButtonsComponent,
    SubmitCancelButtonsComponent
  ]
})
export class SharedModule { }
