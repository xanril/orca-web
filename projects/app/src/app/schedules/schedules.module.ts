import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SchedulesPageComponent } from './schedules-page/schedules-page.component';
import { SchedulesStartComponent } from './schedules-start/schedules-start.component';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { AddCinemaRoomScheduleComponent } from './add-cinema-room-schedule/add-cinema-room-schedule.component';
import { CinemaRoomScheduleItemComponent } from './cinema-room-schedule-item/cinema-room-schedule-item.component';

@NgModule({
  declarations: [
    SchedulesPageComponent,
    SchedulesStartComponent,
    AddCinemaRoomScheduleComponent,
    CinemaRoomScheduleItemComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SchedulesRoutingModule],
})
export class SchedulesModule {}
