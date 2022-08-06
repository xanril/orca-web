import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import * as MoviesActions from './movies.actions';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}

  loadMoviesFromApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovies),
      switchMap(() => {
        return this.moviesService.getMovies().pipe(
          map((response) => {
            return MoviesActions.loadMoviesSuccess({
              movies: response,
            });
          }),
          catchError((error) => {
            return of(MoviesActions.loadMoviesError({ error }));
          })
        );
      })
    )
  );
}
