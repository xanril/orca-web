import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { SchedulesPageComponent } from './schedules-page/schedules-page.component';
import { SchedulesStartComponent } from './schedules-start/schedules-start.component';

export const schedulesRoutes: Routes = [
  {
    path: '',
    component: SchedulesPageComponent,
    children: [
      {
        path: 'room/:roomId',
        component: ScheduleDetailComponent,
      },
      { path: '', component: SchedulesStartComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(schedulesRoutes)],
  exports: [RouterModule],
})
export class SchedulesRoutingModule {}
