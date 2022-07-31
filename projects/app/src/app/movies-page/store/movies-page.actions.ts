import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { SearchMovieResponse, SearchMovieResult } from '../../models/search-movie-result.model';

export const searchMovie = createAction(
  '[Movies] Search Movie',
  props<{ movieTitle: string, page: number }>()
);

export const searchMovieSuccess = createAction(
  '[Movies] Search Success',
  props<{ movieTitle: string, searchMovieResponse: SearchMovieResponse }>()
);

export const searchMovieFailed = createAction(
  '[Movies] Search Failure',
  props<{ error: any }>()
);

export const searchMovieReset = createAction(
  '[Movies] Search Reset'
);

export const addMovie = createAction(
  '[Movies] Add Movie',
  props<{searchMovieResult: SearchMovieResult}>(),
);

export const addMovieSuccess = createAction(
  '[Movies] Add Movie Success',
  props<{movie: Movie}>(),
);