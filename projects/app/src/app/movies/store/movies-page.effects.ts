import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, withLatestFrom } from 'rxjs';
import { TMDBService } from '../../services/tmdb.service';
import * as MoviesPageActions from './movies-page.actions';
import * as MoviesPageSelectors from './movies-page.selectors';
import * as MoviesSelectors from '../../store/movies/movies.selectors';
import { SearchMovieResult } from '../../models/search-movie-result.model';

@Injectable()
export class MoviesPageEffects {
  constructor(private actions$: Actions, private tmdbService: TMDBService, private store: Store) {}

  searchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesPageActions.searchMovie),
      withLatestFrom(this.store.select(MoviesPageSelectors.selectSearchMovieQuery)),
      switchMap(([actionData, movieQuery]) => {
        return this.tmdbService.searchMovie(movieQuery, actionData.page).pipe(
          withLatestFrom(this.store.select(MoviesSelectors.selectMovies)),
          map(([response, existingMovies]) => {
            // check if the movie is already added
            const updatedResults = response.results.map((result) => {
              result.isAdded = existingMovies.find((movie) => movie.tmdbId === result.id) != null;
              return result;
            });

            return {
              ...response,
              results: updatedResults,
            };
          }),
          map((response) => {
            // filter results that don't have posters / backdrop images
            const filteredResults = response.results.filter((result: SearchMovieResult) => {
              if (
                result.poster_path == null ||
                result.poster_path === '' ||
                result.backdrop_path == null ||
                result.backdrop_path === ''
              ) {
                return false;
              }
              return true;
            });

            return {
              ...response,
              results: filteredResults,
            };
          }),
          map((response) => {
            return MoviesPageActions.searchMovieSuccess({
              movieTitle: movieQuery,
              searchMovieResponse: response,
            });
          }),
          catchError((error) => {
            return of(MoviesPageActions.searchMovieFailed({ error }));
          })
        );
      })
    )
  );
}
