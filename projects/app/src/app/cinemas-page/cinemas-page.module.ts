import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemasPageComponent } from './cinemas-page.component';
import { CinemasPageRoutingModule } from './cinemas-page-routing.module';
import { SharedUIModule } from '../shared-ui/shared-ui.module';
import { OldAddCinemaComponent } from './old-add-cinema/old-add-cinema.component';
import { EffectsModule } from '@ngrx/effects';
import { CinemaEffects } from './store/cinema.effects';
import { RoomNameItemComponent } from './old-add-cinema/room-name-item/room-name-item.component';
import { CinemaItemComponent } from './cinema-item/cinema-item.component';
import { RoomNameInputComponent } from './old-add-cinema/room-name-input/room-name-input.component';
import { NewCinemaBlockComponent } from './new-cinema-block/new-cinema-block.component';
import { EditCinemaComponent } from './edit-cinema/edit-cinema.component';
import { CinemaRoomItemComponent } from './cinema-room-item/cinema-room-item.component';
import { NewCinemaRoomBlockComponent } from './new-cinema-room-block/new-cinema-room-block.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CinemasPageComponent,
    OldAddCinemaComponent,
    RoomNameItemComponent,
    CinemaItemComponent,
    RoomNameInputComponent,
    NewCinemaBlockComponent,
    EditCinemaComponent,
    CinemaRoomItemComponent,
    NewCinemaRoomBlockComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedUIModule,
    CinemasPageRoutingModule,
    EffectsModule.forFeature([CinemaEffects]),
  ],
  exports: [CinemasPageComponent, OldAddCinemaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CinemasPageModule {}
