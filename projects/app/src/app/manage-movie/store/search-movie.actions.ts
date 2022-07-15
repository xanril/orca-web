import { createAction, props } from '@ngrx/store';
import { SearchMovieResponse } from '../../models/search-movie-result.model';

const SEARCH_MOVIE: string = '[Movies] Search Movie';
const SEARCH_MOVIE_SUCCESS: string = '[Movies] Search Movie Success';
const SEARCH_MOVIE_FAILED: string = '[Movies] Search Movie Failure';

export const searchMovie = createAction(
  SEARCH_MOVIE,
  props<{ movieTitle: string }>()
);

export const searchMovieSuccess = createAction(
  SEARCH_MOVIE_SUCCESS,
  props<{ searchMovieResponse: SearchMovieResponse }>()
);

export const searchMovieFailed = createAction(
  SEARCH_MOVIE_FAILED,
  props<{ error: any }>()
);
