import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { SearchMovieResult } from '../../models/search-movie-result.model';

export const searchMovieReset = createAction('[Movies] Search Reset');

export const addMovie = createAction(
  '[Movies] Add Movie',
  props<{ searchMovieResult: SearchMovieResult; releaseDate: Date }>()
);

export const addMovieSuccess = createAction(
  '[Movies] Add Movie Success',
  props<{ movie: Movie }>()
);

export const loadMovies = createAction('[Movies / API] Load Movies');

export const loadMoviesSuccess = createAction(
  '[Movies / API] Load Movies Success',
  props<{
    movies: Movie[];
  }>()
);

export const loadMoviesError = createAction(
  '[Movies / API] Load Movies Error',
  props<{ error: any }>()
);
