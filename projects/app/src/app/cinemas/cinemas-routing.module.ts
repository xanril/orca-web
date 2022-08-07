import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCinemaRoomScheduleComponent } from './add-cinema-room-schedule/add-cinema-room-schedule.component';
import { CinemaRoomScheduleItemComponent } from './cinema-room-schedule-item/cinema-room-schedule-item.component';
import { CinemasPageComponent } from './cinemas-page/cinemas-page.component';
import { EditCinemaRoomComponent } from './edit-cinema-room/edit-cinema-room.component';
import { EditCinemaComponent } from './edit-cinema/edit-cinema.component';

const cinemasPageRoutes: Routes = [
  {
    path: '',
    component: CinemasPageComponent,
    children: [
      { path: 'room/:id', component: EditCinemaRoomComponent },
      { path: 'edit/:id', component: EditCinemaComponent },
    ],
  },

  // { path: '', component: AddCinemaRoomScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(cinemasPageRoutes)],
  exports: [RouterModule],
})
export class CinemasPageRoutingModule {}
