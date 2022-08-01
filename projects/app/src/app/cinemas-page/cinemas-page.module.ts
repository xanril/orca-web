import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemasPageComponent } from './cinemas-page.component';
import { CinemasPageRoutingModule } from './cinemas-page-routing.module';
import { SharedUIModule } from '../shared-ui/shared-ui.module';
import { EffectsModule } from '@ngrx/effects';
import { CinemaEffects } from './store/cinema.effects';
import { CinemaItemComponent } from './cinema-item/cinema-item.component';
import { NewCinemaBlockComponent } from './new-cinema-block/new-cinema-block.component';
import { EditCinemaComponent } from './edit-cinema/edit-cinema.component';
import { CinemaRoomItemComponent } from './cinema-room-item/cinema-room-item.component';
import { NewCinemaRoomBlockComponent } from './new-cinema-room-block/new-cinema-room-block.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CinemasPageComponent,
    CinemaItemComponent,
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
  exports: [CinemasPageComponent],
})
export class CinemasPageModule {}
