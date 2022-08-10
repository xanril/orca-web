import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemasPageComponent } from './cinemas-page/cinemas-page.component';
import { CinemasPageRoutingModule } from './cinemas-routing.module';
import { SharedModule } from '../shared/shared-ui.module';
import { RoomItemComponent } from './components/room-item/room-item.component';
import { AddNewItemComponent } from './components/add-new-item/add-room-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CinemaRoomScheduleItemComponent } from './cinema-room-schedule-item/cinema-room-schedule-item.component';
import { AddCinemaRoomScheduleComponent } from './add-cinema-room-schedule/add-cinema-room-schedule.component';
import { CinemaListComponent } from './components/cinema-list/cinema-list.component';
import { CinemasStartComponent } from './cinemas-start/cinemas-start.component';
import { StoreModule } from '@ngrx/store';
import * as fromCinemasPage from './store/cinemas-page.reducer';
import { CinemaDetailComponent } from './cinema-detail/cinema-detail.component';

@NgModule({
  declarations: [
    CinemasPageComponent,
    RoomItemComponent,
    AddNewItemComponent,
    CinemaRoomScheduleItemComponent,
    AddCinemaRoomScheduleComponent,
    CinemaListComponent,
    CinemasStartComponent,
    CinemaDetailComponent,
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
