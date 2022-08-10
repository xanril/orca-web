import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesPageComponent } from './schedules-page/schedules-page.component';
import { SchedulesStartComponent } from './schedules-start/schedules-start.component';
import { SchedulesRoutingModule } from './schedules-routing.module';



@NgModule({
  declarations: [
    SchedulesPageComponent,
    SchedulesStartComponent
  ],
  imports: [
    CommonModule,
    SchedulesRoutingModule
  ]
})
export class SchedulesModule { }
