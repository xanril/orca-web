import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SchedulesPageComponent } from "./schedules-page/schedules-page.component";
import { SchedulesStartComponent } from "./schedules-start/schedules-start.component";

export const schedulesRoutes: Routes = [
    {
      path: '',
      component: SchedulesPageComponent,
      children: [
        { path: '', component: SchedulesStartComponent },
      ],
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(schedulesRoutes)],
    exports: [RouterModule],
  })
export class SchedulesRoutingModule {}