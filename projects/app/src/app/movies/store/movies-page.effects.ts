import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, withLatestFrom } from 'rxjs';
import { TMDBService } from '../../services/tmdb.service';
import * as MoviesPageActions from './movies-page.actions';
import * as MoviesPageSelectors from './movies-page.selectors';
import * as MoviesSelectors from '../../store/movies/movies.selectors';

@Injectable()
export class MoviesPageApiEffects {
  constructor(
    private actions$: Actions,
    private tmdbService: TMDBService,
    private store: Store
  ) {}

  searchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesPageActions.searchMovie),
      withLatestFrom(
        this.store.select(MoviesPageSelectors.selectSearchMovieQuery)
      ),
      switchMap(([actionData, movieQuery]) => {
        return this.tmdbService.searchMovie(movieQuery, actionData.page).pipe(
          withLatestFrom(this.store.select(MoviesSelectors.selectMovies)),
          map(([response, existingMovies]) => {
            // check if the movie is already added
            const updatedResults = response.results.map((result) => {
              result.isAdded =
                existingMovies.find((movie) => movie.tmdbId === result.id) !=
                null;
              return result;
            });

            return {
              ...response,
              results: updatedResults,
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
