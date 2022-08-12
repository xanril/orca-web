import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { SchedulesPageComponent } from './schedules-page/schedules-page.component';
import { SchedulesStartComponent } from './schedules-start/schedules-start.component';
import { AddCinemaRoomScheduleComponent } from './add-cinema-room-schedule/add-cinema-room-schedule.component';
import { CinemaRoomScheduleItemComponent } from './cinema-room-schedule-item/cinema-room-schedule-item.component';
import { SchedulesSideComponent } from './components/schedules-side/schedules-side.component';
import { schedulesPageFeature } from './store/schedules-page.reducer';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleItemComponent } from './components/schedule-item/schedule-item.component';

@NgModule({
  declarations: [
    SchedulesPageComponent,
    SchedulesStartComponent,
    AddCinemaRoomScheduleComponent,
    CinemaRoomScheduleItemComponent,
    SchedulesSideComponent,
    ScheduleDetailComponent,
    ScheduleItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SchedulesRoutingModule,
    StoreModule.forFeature(schedulesPageFeature),
  ],
})
export class SchedulesModule {}
