import { createFeature, createReducer, on } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { SearchMovieResponse } from '../../models/search-movie-result.model';
import * as MoviesPageActions from './movies.actions';

export const moviesFeatureKey = 'movies';

export interface State {
  tmdbMovieId: number;
  searchMovieResponse: SearchMovieResponse;
  movies: Movie[];
  searchedMovieTitle: string;
}

const DUMMY_MOVIES: Movie[] = [
  {
    id: 0,
    tmdbId: 299534,
    title: 'Avengers: Endgame',
    overview:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
    runtime: 120,
    tagline: '',
    posterUrl: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    backdropUrl: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    releaseDate: '2019-04-24',
  },
  {
    id: 1,
    tmdbId: 284053,
    title: 'Thor: Ragnarok',
    overview:
      'Thor is imprisoned on the other side of the universe and finds himself in a race against time to get back to Asgard to stop Ragnarok, the destruction of his home-world and the end of Asgardian civilization, at the hands of a powerful new threat, the ruthless Hela.',
    runtime: 60,
    tagline: '',
    posterUrl: '/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',
    backdropUrl: '/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg',
    releaseDate: '2017-10-24',
  },
  {
    id: 2,
    tmdbId: 27205,
    title: 'Inception',
    overview:
      'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: "inception", the implantation of another person\'s idea into a target\'s subconscious.',
    runtime: 60,
    tagline: '',
    posterUrl: '/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg',
    backdropUrl: '/ztZ4vw151mw04Bg6rqJLQGBAmvn.jpg',
    releaseDate: '2010-07-15',
  },
];

export const initialState: State = {
  tmdbMovieId: -1,
  searchMovieResponse: {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  },
  movies: DUMMY_MOVIES,
  searchedMovieTitle: '',
};

export const moviesFeature = createFeature({
  name: 'movies',
  reducer: createReducer(
    initialState,
    on(MoviesPageActions.searchMovie, (state: State, action) => {
      return {
        ...state,
        searchedMovieTitle: action.movieTitle,
      };
    }),
    on(MoviesPageActions.searchMovieSuccess, (state: State, action) => {
      return {
        ...state,
        searchMovieResponse: action.searchMovieResponse,
      };
    }),
    on(MoviesPageActions.addMovieSuccess, (state: State, action) => {
      return {
        ...state,
        movies: [...state.movies, action.movie],
      };
    }),
    on(MoviesPageActions.searchMovieReset, (state: State, action) => {
      return {
        ...state,
        searchMovieResponse: initialState.searchMovieResponse,
        searchedMovieTitle: '',
      };
    })
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectTmdbMovieId,
  selectSearchMovieResponse,
  selectMovies,
  selectSearchedMovieTitle,
} = moviesFeature;
