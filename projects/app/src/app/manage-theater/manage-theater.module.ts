import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTheaterComponent } from './manage-theater.component';
import { ManageTheaterRoutingModule } from './manage-theater-routing.module';
import { SharedUIModule } from '../shared-ui/shared-ui.module';
import { AddTheaterComponent } from './add-theater/add-theater.component';
import { EffectsModule } from '@ngrx/effects';
import { TheaterEffects } from './store/theater.effects';

@NgModule({
  declarations: [ManageTheaterComponent, AddTheaterComponent],
  imports: [
    CommonModule,
    SharedUIModule,
    ManageTheaterRoutingModule,
    EffectsModule.forFeature([TheaterEffects]),
  ],
  exports: [
    ManageTheaterComponent, AddTheaterComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManageTheaterModule {}
