import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, withLatestFrom } from 'rxjs';
import { TMDBService } from '../../services/tmdb.service';
import * as MoviesPageActions from './movies-page.actions';
import * as MoviesPageSelectors from './movies-page.selectors';

@Injectable()
export class MoviesPageApiEffects {
  constructor(private actions$: Actions, private tmdbService: TMDBService, private store: Store) {}

  searchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesPageActions.searchMovie),
      withLatestFrom(this.store.select(MoviesPageSelectors.selectSearchMovieQuery)),
      switchMap(([actionData, movieQuery]) => {
        return this.tmdbService
          .searchMovie(movieQuery, actionData.page)
          .pipe(
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
