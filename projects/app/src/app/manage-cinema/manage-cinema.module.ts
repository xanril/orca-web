import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageCinemaComponent } from './manage-cinema.component';
import { ManageCinemaRoutingModule } from './manage-cinema-routing.module';
import { SharedUIModule } from '../shared-ui/shared-ui.module';
import { AddCinemaComponent } from './add-cinema/add-cinema.component';
import { EffectsModule } from '@ngrx/effects';
import { CinemaEffects } from './store/cinema.effects';
import { RoomNameItemComponent } from './add-cinema/room-name-item/room-name-item.component';
import { CinemaItemComponent } from './cinema-item/cinema-item.component';
import { RoomNameInputComponent } from './add-cinema/room-name-input/room-name-input.component';

@NgModule({
  declarations: [ManageCinemaComponent, AddCinemaComponent, RoomNameItemComponent, CinemaItemComponent, RoomNameInputComponent],
  imports: [
    CommonModule,
    SharedUIModule,
    ManageCinemaRoutingModule,
    EffectsModule.forFeature([CinemaEffects]),
  ],
  exports: [
    ManageCinemaComponent, AddCinemaComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManageCinemaModule {}
