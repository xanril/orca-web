import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageAddMovieComponent } from './manage-add-movie/manage-add-movie.component';
import { MoviesPageComponent } from './movies-page.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';
import { SearchMovieItemComponent } from './search-movie-item/search-movie-item.component';
import { CommonModule } from '@angular/common';
import { MoviesPageEffects } from './store/movies-page.effects';
import { EffectsModule } from '@ngrx/effects';
import { MoviesPageRoutingModule } from './movies-page-routing.module';
import { SharedUIModule } from '../shared-ui/shared-ui.module';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { SearchMovieFormComponent } from './search-movie-form/search-movie-form.component';

@NgModule({
  declarations: [
    MoviesPageComponent,
    ManageAddMovieComponent,
    SearchMovieComponent,
    SearchMovieItemComponent,
    MovieItemComponent,
    SearchMovieFormComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedUIModule,
    EffectsModule.forFeature([MoviesPageEffects]),
    MoviesPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    MoviesPageComponent,
    ManageAddMovieComponent,
    SearchMovieComponent,
    SearchMovieItemComponent,
  ],
})
export class MoviesPageModule {}
