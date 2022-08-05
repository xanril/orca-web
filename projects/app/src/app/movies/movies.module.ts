import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageAddMovieComponent } from './manage-add-movie/manage-add-movie.component';
import { MoviesListPageComponent } from './movies-page/movies-page.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';
import { SearchMovieItemComponent } from './components/search-movie-item/search-movie-item.component';
import { CommonModule } from '@angular/common';
import { MoviesEffects } from '../store/movies/movies.effects';
import { EffectsModule } from '@ngrx/effects';
import { MoviesPageRoutingModule } from './movies-page-routing.module';
import { SharedUIModule } from '../shared-ui/shared-ui.module';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { SearchMovieFormComponent } from './components/search-movie-form/search-movie-form.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';

@NgModule({
  declarations: [
    MoviesListPageComponent,
    ManageAddMovieComponent,
    SearchMovieComponent,
    SearchMovieItemComponent,
    MovieItemComponent,
    SearchMovieFormComponent,
    MovieListComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedUIModule,
    EffectsModule.forFeature([MoviesEffects]),
    MoviesPageRoutingModule
  ],
  exports: [
    MoviesListPageComponent,
    ManageAddMovieComponent,
    SearchMovieComponent,
    SearchMovieItemComponent,
  ],
})
export class MoviesModule {}
