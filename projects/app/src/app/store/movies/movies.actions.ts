import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { SearchMovieResult } from '../../models/search-movie-result.model';

export const searchMovieReset = createAction('[Movies] Search Reset');

export const loadMovies = createAction('[Movies / API] Load Movies');

export const loadMoviesSuccess = createAction(
  '[Movies API] Load Movies Success',
  props<{
    movies: Movie[];
  }>()
);

export const loadMoviesError = createAction(
  '[Movies API] Load Movies Error',
  props<{ error: any }>()
);

export const addMovie = createAction(
  '[Movies API] Add Movie',
  props<{ searchMovieResult: SearchMovieResult; }>()
);

export const addMovieSuccess = createAction(
  '[Movies API] Add Movie Success',
  props<{ movie: Movie }>()
);

export const addMoviesError = createAction(
  '[Movies API] Add Movie Error',
  props<{ error: any }>()
);

export const deleteMovie = createAction(
  '[Movies API] Delete Movie',
  props<{ id: number }>()
);

export const deleteMovieSuccess = createAction(
  '[Movies / API] Delete Movie Success',
  props<{ id: number }>()
);

export const deleteMoviesError = createAction(
  '[Movies API] Delete Movie Error',
  props<{ error: any }>()
);

export const updateMovie = createAction(
  '[Movies API] Update Movie',
  props<{ updatedMovie: Movie }>()
);

export const updateMovieSuccess = createAction(
  '[Movies API] Update Movie Success',
  props<{ updatedMovie: Movie }>()
);

export const updateMoviesError = createAction(
  '[Movies API] Update Movie Error',
  props<{ error: any }>()
);

