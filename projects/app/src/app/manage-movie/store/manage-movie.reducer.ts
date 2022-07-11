import { Action, createReducer, on } from '@ngrx/store';
import { SearchMovieResponse } from '../search-movie-result.model';
import { searchMovie, searchMovieSuccess } from './manage-movie.actions';


export const manageMovieFeatureKey = 'manageMovie';

export interface State {
  tmdbMovieId: number
  searchMovieResponse?: SearchMovieResponse
}

export const initialState: State = {
  tmdbMovieId: -1
};

export const reducer = createReducer(
  initialState,
  on(searchMovie, (state: State, action) => {
    return initialState;
  }),
  on(searchMovieSuccess, (state: State, action) => {
    return {
      ...state,
      searchMovieResponse: action.searchMovieResponse
    }
  })
);
