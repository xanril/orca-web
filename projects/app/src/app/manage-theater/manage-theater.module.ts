import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageTheaterComponent } from './manage-theater.component';
import { ManageTheaterRoutingModule } from './manage-theater-routing.module';
import { SharedUIModule } from '../shared-ui/shared-ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTheaterComponent } from './add-theater/add-theater.component';

@NgModule({
  declarations: [ManageTheaterComponent, AddTheaterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedUIModule,
    ManageTheaterRoutingModule,
  ],
  exports: [
    ManageTheaterComponent, AddTheaterComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManageTheaterModule {}
