import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinemaRoomScheduleItemComponent } from './cinema-room-schedule-item/cinema-room-schedule-item.component';
import { CinemasPageComponent } from './cinemas-page.component';
import { EditCinemaRoomComponent } from './edit-cinema-room/edit-cinema-room.component';
import { EditCinemaComponent } from './edit-cinema/edit-cinema.component';

const cinemasPageRoutes: Routes = [
  { path: 'room/:id', component: EditCinemaRoomComponent },
  { path: 'edit/:id', component: EditCinemaComponent },
  { path: '', component: CinemasPageComponent },
  // { path: '', component: CinemaRoomScheduleItemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(cinemasPageRoutes)],
  exports: [RouterModule],
})
export class CinemasPageRoutingModule {}
