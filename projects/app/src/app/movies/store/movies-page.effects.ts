import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { TMDBService } from '../../services/tmdb.service';
import * as MoviesPageActions from './movies-page.actions';

@Injectable()
export class MoviesPageApiEffects {
  constructor(private actions$: Actions, private tmdbService: TMDBService) {}

  searchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesPageActions.searchMovie),
      switchMap((actionData) => {
        return this.tmdbService
          .searchMovie(actionData.movieTitle, actionData.page)
          .pipe(
            map((response) => {
              // check if result items are already added to movie collection
              // response.results = this.checkIfMovieResultExists(
              //   response.results
              // );

              return MoviesPageActions.searchMovieSuccess({
                movieTitle: actionData.movieTitle,
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
