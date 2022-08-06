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
    on(MoviesPageActions.loadMoviesSuccess, (state: State, actions) => {
      return {
        ...state,
        movies: [...actions.movies],
      };
    }),
    on(MoviesPageActions.addMovieSuccess, (state: State, action) => {
      // TODO: remove when backend is integrated
      const newMovie: Movie = {
        ...action.movie,
        id: state.movies.length,
      };

      return {
        ...state,
        movies: [...state.movies, newMovie],
      };
    }),
    on(MoviesPageActions.deleteMovieSuccess, (state: State, action) => {
      return {
        ...state,
        movies: state.movies.filter((item) => item.id !== action.id),
      };
    })
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectMovies,
} = moviesFeature;
