import { createAction, props } from '@ngrx/store';
import { SearchMovieResponse } from '../../models/search-movie-result.model';

const SEARCH_MOVIE: string = '[Movies] Search Movie';
const SEARCH_MOVIE_SUCCESS: string = '[Movies] Search Success';
const SEARCH_MOVIE_FAILED: string = '[Movies] Search Failure';
const SEARCH_MOVIE_RESET: string = '[Movies] Search Reset';

export const searchMovie = createAction(
  SEARCH_MOVIE,
  props<{ movieTitle: string, page: number }>()
);

export const searchMovieSuccess = createAction(
  SEARCH_MOVIE_SUCCESS,
  props<{ movieTitle: string, searchMovieResponse: SearchMovieResponse }>()
);

export const searchMovieFailed = createAction(
  SEARCH_MOVIE_FAILED,
  props<{ error: any }>()
);

export const searchMovieReset = createAction(
  SEARCH_MOVIE_RESET
);
