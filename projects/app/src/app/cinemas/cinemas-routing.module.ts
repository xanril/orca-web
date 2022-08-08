import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCinemaRoomScheduleComponent } from './add-cinema-room-schedule/add-cinema-room-schedule.component';
import { CinemaRoomScheduleItemComponent } from './cinema-room-schedule-item/cinema-room-schedule-item.component';
import { CinemasPageComponent } from './cinemas-page/cinemas-page.component';
import { CinemasStartComponent } from './cinemas-start/cinemas-start.component';
import { EditCinemaRoomComponent } from './edit-cinema-room/edit-cinema-room.component';
import { EditCinemaComponent } from './edit-cinema/edit-cinema.component';

const cinemasRoutes: Routes = [
  {
    path: '',
    component: CinemasPageComponent,
    children: [
      // { path: 'room/:id', component: EditCinemaRoomComponent },
      // { path: 'edit/:id', component: EditCinemaComponent },
      { path: '', component: CinemasStartComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cinemasRoutes)],
  exports: [RouterModule],
})
export class CinemasPageRoutingModule {}
