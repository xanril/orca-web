import { createAction, props } from "@ngrx/store";
import { SearchMovieResponse } from "../../models/search-movie-result.model";

export const setActiveMovie = createAction(
  '[Movies Page] Set Active Movie',
  props<{ movieId: number }>()
);

export const searchMovie = createAction(
  '[Movies Search / API] Search Movie',
  props<{ movieTitle: string; page: number }>()
);

export const searchMovieSuccess = createAction(
  '[Movies Search / API] Search Success',
  props<{ movieTitle: string; searchMovieResponse: SearchMovieResponse }>()
);

export const searchMovieFailed = createAction(
  '[Movies Search / API] Search Failure',
  props<{ error: any }>()
);