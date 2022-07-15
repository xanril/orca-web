import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { TMDBService } from '../../shared/tmdb.service';
import * as SearchMovieActions from './search-movie.actions';

@Injectable()
export class ManageMovieEffects {
  constructor(private actions$: Actions, private tmdbService: TMDBService) {}

  searchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchMovieActions.searchMovie),
      switchMap((actionData) => {
        return this.tmdbService.searchMovie(actionData.movieTitle).pipe(
          map((response) => {
            return SearchMovieActions.searchMovieSuccess({
              searchMovieResponse: response,
            });
          }),
          catchError((error) => {
            return of(SearchMovieActions.searchMovieFailed({ error }));
          })
        );
      })
    )
  );
}
