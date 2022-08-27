import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { SchedulesPageComponent } from './schedules-page/schedules-page.component';
import { SchedulesStartComponent } from './schedules-start/schedules-start.component';
import { SchedulesSideComponent } from './components/schedules-side/schedules-side.component';
import { schedulesPageFeature } from './store/schedules-page.reducer';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleItemComponent } from './components/schedule-item/schedule-item.component';
import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';
import { AddScheduleItemComponent } from './components/add-schedule-item/add-schedule-item.component';
import { SchedulesPageEffects } from './store/schedules-page.effects';

@NgModule({
  declarations: [
    SchedulesPageComponent,
    SchedulesStartComponent,
    SchedulesSideComponent,
    ScheduleDetailComponent,
    ScheduleItemComponent,
    ScheduleFormComponent,
    AddScheduleItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SchedulesRoutingModule,
    StoreModule.forFeature(schedulesPageFeature),
    EffectsModule.forFeature([SchedulesPageEffects]),
  ],
})
export class SchedulesModule {}
