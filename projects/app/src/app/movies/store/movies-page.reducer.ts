import { createFeature, createReducer, on } from '@ngrx/store';
import { SearchMovieResponse } from '../../models/search-movie-result.model';
import * as MoviesPageActions from './movies-page.actions';

export interface State {
  activeMovieId: number;
  searchResponse: SearchMovieResponse | null;
  searchMovieQuery: string;
}

export const initialState: State = {
  activeMovieId: -1,
  searchResponse: null,
  searchMovieQuery: '',
};

export const moviesPageFeature = createFeature({
  name: 'moviesPage',
  reducer: createReducer(
    initialState,
    on(MoviesPageActions.setActiveMovie, (state: State, action) => {
      return {
        ...state,
        activeMovieId: action.movieId,
      };
    }),
    on(MoviesPageActions.setSearchMovieQuery, (state: State, action) => {
      return {
        ...state,
        searchMovieQuery: action.movieQuery,
      };
    }),
    on(MoviesPageActions.resetActiveMovie, (state: State, action) => {
      return {
        ...state,
        activeMovieId: -1
      };
    }),
    on(MoviesPageActions.resetSearch, (state: State, action) => {
      return {
        ...state,
        searchMovieQuery: '',
        searchResponse: null
      };
    }),
    on(MoviesPageActions.searchMovieSuccess, (state: State, action) => {
      return {
        ...state,
        searchResponse: action.searchMovieResponse,
      };
    })
  ),
});
