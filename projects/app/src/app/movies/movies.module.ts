import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
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
import { MoviesStartComponent } from './movies-start/movies-start.component';

@NgModule({
  declarations: [
    MoviesListPageComponent,
    MovieDetailComponent,
    SearchMovieComponent,
    SearchMovieItemComponent,
    MovieItemComponent,
    SearchMovieFormComponent,
    MovieListComponent,
    MoviesStartComponent,
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
    MovieDetailComponent,
    SearchMovieComponent,
    SearchMovieItemComponent,
  ],
})
export class MoviesModule {}
