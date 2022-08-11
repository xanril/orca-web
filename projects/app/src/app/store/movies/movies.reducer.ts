import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import * as MoviesPageActions from './movies.actions';

export const moviesFeatureKey = 'moviesData';

export const moviesAdapter = createEntityAdapter<Movie>();

export interface State extends EntityState<Movie> {
}

export const moviesFeature = createFeature({
  name: moviesFeatureKey,
  reducer: createReducer(
    moviesAdapter.getInitialState(),
    on(MoviesPageActions.loadMoviesSuccess, (state: State, actions) => {
      return moviesAdapter.addMany(actions.movies, state);
    }),
    on(MoviesPageActions.addMovieSuccess, (state: State, action) => {
      return moviesAdapter.addOne(action.movie, state);
    }),
    on(MoviesPageActions.deleteMovieSuccess, (state: State, action) => {
      return moviesAdapter.removeOne(action.id, state);
    }),
    on(MoviesPageActions.updateMovieSuccess, (state: State, action) => {
      return moviesAdapter.upsertOne(action.updatedMovie, state);
    })
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
} = moviesFeature;
