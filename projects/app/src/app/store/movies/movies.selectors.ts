import { createSelector } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { moviesFeature } from './movies.reducer';

export const selectMovieWithId = (movieId: number) => {
    return createSelector(
        selectMovies,
        ((movies) => {
            const movie = movies.find((movie) => movie.id === movieId);
            return movie as Movie;
        })
    )
}

export const { selectMovies } = moviesFeature;
