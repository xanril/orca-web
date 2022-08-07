import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesListPageComponent } from './movies-page/movies-page.component';
import { MoviesSearchComponent } from './movies-search/movies-search.component';
import { SearchMovieItemComponent } from './components/search-movie-item/search-movie-item.component';
import { CommonModule } from '@angular/common';
import { MoviesPageRoutingModule } from './movies-page-routing.module';
import { SharedModule } from '../shared/shared-ui.module';
import { SearchMovieFormComponent } from './components/search-movie-form/search-movie-form.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MoviesStartComponent } from './movies-start/movies-start.component';
import { StoreModule } from '@ngrx/store';
import { moviesPageFeature } from './store/movies-page.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MoviesPageApiEffects } from './store/movies-page.effects';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MoviesListPageComponent,
    MovieListComponent,
    MovieDetailComponent,
    MoviesSearchComponent,
    SearchMovieItemComponent,
    SearchMovieFormComponent,
    MoviesStartComponent,
    MovieEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    MoviesPageRoutingModule,
    StoreModule.forFeature(
      moviesPageFeature
    ),
    EffectsModule.forFeature([MoviesPageApiEffects]),
  ],
  exports: [
    MoviesListPageComponent,
    MovieDetailComponent,
    MoviesSearchComponent,
    SearchMovieItemComponent,
    SearchMovieFormComponent,
    MovieListComponent,
    MoviesStartComponent,
  ],
})
export class MoviesModule {}
