import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CinemasPageRoutingModule } from './cinemas-routing.module';
import { SharedModule } from '../shared/shared-ui.module';
import { CinemasPageComponent } from './cinemas-page/cinemas-page.component';
import { RoomItemComponent } from './components/room-item/room-item.component';
import { AddNewItemComponent } from './components/add-new-item/add-room-item.component';
import { CinemaListComponent } from './components/cinema-list/cinema-list.component';
import { CinemasStartComponent } from './cinemas-start/cinemas-start.component';
import { CinemaDetailComponent } from './cinema-detail/cinema-detail.component';
import { CinemaEditFormComponent } from './components/cinema-edit-form/cinema-edit-form.component';
import * as fromCinemasPage from './store/cinemas-page.reducer';

@NgModule({
  declarations: [
    CinemasPageComponent,
    RoomItemComponent,
    AddNewItemComponent,
    CinemaListComponent,
    CinemasStartComponent,
    CinemaDetailComponent,
    CinemaEditFormComponent,
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
