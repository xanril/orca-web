import { createFeature, createReducer, on } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import * as MoviesPageActions from './movies.actions';

export const moviesFeatureKey = 'movies';

export interface State {
  movies: Movie[];
}

export const initialState: State = {
  movies: [],
};

export const moviesFeature = createFeature({
  name: 'movies',
  reducer: createReducer(
    initialState,
    
    on(MoviesPageActions.addMovieSuccess, (state: State, action) => {
      return {
        ...state,
        movies: [...state.movies, action.movie],
      };
    }),
    on(MoviesPageActions.loadMoviesSuccess, (state: State, actions) => {
      return {
        ...state,
        movies: [...actions.movies]
      }
    })
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectMovies,
} = moviesFeature;
