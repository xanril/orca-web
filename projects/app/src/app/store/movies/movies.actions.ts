import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import {
  SearchMovieResult,
} from '../../models/search-movie-result.model';

export const searchMovieReset = createAction('[Movies] Search Reset');

export const addMovie = createAction(
  '[Movies] Add Movie',
  props<{ searchMovieResult: SearchMovieResult, releaseDate: Date }>()
);

export const addMovieSuccess = createAction(
  '[Movies] Add Movie Success',
  props<{ movie: Movie }>()
);
