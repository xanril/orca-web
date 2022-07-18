import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of } from 'rxjs';
import { TMDBService } from '../../shared/tmdb.service';
import { AppState } from '../../store';
import * as SearchMovieActions from './search-movie.actions';

@Injectable()
export class ManageMovieEffects {
  constructor(
    private actions$: Actions,
    private tmdbService: TMDBService
  ) {}

  searchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchMovieActions.searchMovie),
      switchMap((actionData) => {
        return this.tmdbService
          .searchMovie(actionData.movieTitle, actionData.page)
          .pipe(
            map((response) => {
              return SearchMovieActions.searchMovieSuccess({
                movieTitle: actionData.movieTitle,
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
