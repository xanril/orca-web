import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { SearchMovieResult } from '../../models/search-movie-result.model';

const ADD_MOVIE: string = '[Movies] Add Movie';
const ADD_MOVIE_SUCCESS: string = '[Movies] Add Movie Success';

export const addMovie = createAction(
  ADD_MOVIE,
  props<{searchMovieResult: SearchMovieResult}>(),
);

export const addMovieSuccess = createAction(
  ADD_MOVIE_SUCCESS,
  props<{movie: Movie}>(),
);