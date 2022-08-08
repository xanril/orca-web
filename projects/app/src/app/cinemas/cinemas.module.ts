import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemasPageComponent } from './cinemas-page/cinemas-page.component';
import { CinemasPageRoutingModule } from './cinemas-routing.module';
import { SharedModule } from '../shared/shared-ui.module';
import { CinemaItemComponent } from './cinema-item/cinema-item.component';
import { NewCinemaBlockComponent } from './new-cinema-block/new-cinema-block.component';
import { EditCinemaComponent } from './edit-cinema/edit-cinema.component';
import { CinemaRoomItemComponent } from './cinema-room-item/cinema-room-item.component';
import { NewCinemaRoomBlockComponent } from './new-cinema-room-block/new-cinema-room-block.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CinemaRoomScheduleItemComponent } from './cinema-room-schedule-item/cinema-room-schedule-item.component';
import { EditCinemaRoomComponent } from './edit-cinema-room/edit-cinema-room.component';
import { AddCinemaRoomScheduleComponent } from './add-cinema-room-schedule/add-cinema-room-schedule.component';
import { CinemaListComponent } from './components/cinema-list/cinema-list.component';
import { CinemasStartComponent } from './cinemas-start/cinemas-start.component';
import { StoreModule } from '@ngrx/store';
import * as fromCinemasPage from './store/cinemas-page.reducer';

@NgModule({
  declarations: [
    CinemasPageComponent,
    CinemaItemComponent,
    NewCinemaBlockComponent,
    EditCinemaComponent,
    CinemaRoomItemComponent,
    NewCinemaRoomBlockComponent,
    CinemaRoomScheduleItemComponent,
    EditCinemaRoomComponent,
    AddCinemaRoomScheduleComponent,
    CinemaListComponent,
    CinemasStartComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CinemasPageRoutingModule,
    StoreModule.forFeature(
      fromCinemasPage.cinemasPageFeature
    ),
  ],
  exports: [CinemasPageComponent],
})
export class CinemasModule {}
