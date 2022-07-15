import { createReducer, on } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { SearchMovieResponse } from '../../models/search-movie-result.model';
import * as AddMovieActions from './add-movie.actions';
import * as SearchMovieActions from './search-movie.actions';

export const moviesFeatureKey = 'movies';

export interface State {
  tmdbMovieId: number;
  searchMovieResponse?: SearchMovieResponse;
  movies: Movie[];
}

export const initialState: State = {
  tmdbMovieId: -1,
  movies: [],
};

export const reducer = createReducer(
  initialState,
  on(SearchMovieActions.searchMovie, (state: State, action) => {
    return initialState;
  }),
  on(SearchMovieActions.searchMovieSuccess, (state: State, action) => {
    return {
      ...state,
      searchMovieResponse: action.searchMovieResponse,
    };
  }),
  on(AddMovieActions.addMovieSuccess, (state: State, action) => {
    return {
      ...state,
      movies: [...state.movies, action.movie],
    };
  })
);
