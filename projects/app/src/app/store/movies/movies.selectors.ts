import { createSelector } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { moviesAdapter, moviesFeature } from './movies.reducer';

const { selectAll, selectEntities, selectTotal } = moviesAdapter.getSelectors();

export const selectMovieWithId = (movieId: number) =>
  createSelector(moviesFeature.selectMoviesDataState, (state) => {
    const movieEntities = selectEntities(state);
    return movieEntities[movieId] as Movie;
  });

export const selectMovies = createSelector(
  moviesFeature.selectMoviesDataState,
  (state) => selectAll(state)
);

export const selectTotalMoviesCount = createSelector(
  moviesFeature.selectMoviesDataState,
  (state) => selectTotal(state)
);
