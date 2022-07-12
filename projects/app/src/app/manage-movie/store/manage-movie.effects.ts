import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { TMDBService } from '../../shared/tmdb.service';
import {
  searchMovie,
  searchMovieFailed,
  searchMovieSuccess,
} from './manage-movie.actions';

@Injectable()
export class ManageMovieEffects {
  constructor(private actions$: Actions, private tmdbService: TMDBService) {}

  searchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchMovie),
      switchMap((actionData) => {
        return this.tmdbService.searchMovie(actionData.movieTitle).pipe(
          map((response) => {
            return searchMovieSuccess({ searchMovieResponse: response });
          }),
          catchError((error) => {
            return of(searchMovieFailed({ error }));
          })
        );
      })
    )
  );
}
