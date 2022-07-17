import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageAddMovieComponent } from './manage-add-movie/manage-add-movie.component';
import { ManageMovieComponent } from './manage-movie.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';
import { SearchMovieItemComponent } from './search-movie-item/search-movie-item.component';
import { CommonModule } from '@angular/common';
import { ManageMovieEffects } from './store/search-movie.effects';
import { EffectsModule } from '@ngrx/effects';
import { AddMovieEffects } from './store/add-movie.effects';
import { ManageMovieRoutingModule } from './manage-movie-routing.module';

@NgModule({
  declarations: [
    ManageMovieComponent,
    ManageAddMovieComponent,
    SearchMovieComponent,
    SearchMovieItemComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    EffectsModule.forFeature([ManageMovieEffects, AddMovieEffects]),
    ManageMovieRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ManageMovieComponent,
    ManageAddMovieComponent,
    SearchMovieComponent,
    SearchMovieItemComponent,
  ],
})
export class ManageMovieModule {}
