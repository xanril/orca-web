import { createAction, props } from '@ngrx/store';
import { SearchMovieResponse } from '../../models/search-movie-result.model';

export const setActiveMovie = createAction(
  '[Movies Page] Set Active Movie',
  props<{ movieId: number }>()
);

export const setSearchMovieQuery = createAction(
  '[Movies Page] Set Search Movie Query',
  props<{ movieQuery: string }>()
);

export const resetActiveMovie = createAction(
  '[Movies Page] Reset Active Movie'
);

export const resetSearch = createAction('[Movies Page] Reset Search');

export const searchMovie = createAction(
  '[Movies Search / API] Search Movie',
  props<{ page: number }>()
);

export const searchMovieSuccess = createAction(
  '[Movies Search / API] Search Success',
  props<{ movieTitle: string; searchMovieResponse: SearchMovieResponse }>()
);

export const searchMovieFailed = createAction(
  '[Movies Search / API] Search Failure',
  props<{ error: any }>()
);
