import { createFeature, createReducer, on } from '@ngrx/store';
import { SearchMovieResponse } from '../../models/search-movie-result.model';
import * as MoviesPageActions from './movies-page.actions';

export interface State {
  activeMovieId: number;
  tmdbMovieId: number;
  searchResponse: SearchMovieResponse | null;
  searchTitle: string;
}

export const initialState: State = {
  activeMovieId: -1,
  tmdbMovieId: -1,
  searchResponse: null,
  searchTitle: '',
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
    on(MoviesPageActions.searchMovie, (state: State, action) => {
      return {
        ...state,
        searchTitle: action.movieTitle,
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
