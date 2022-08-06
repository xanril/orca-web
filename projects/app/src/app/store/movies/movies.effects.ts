import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { SearchMovieResult } from '../../models/search-movie-result.model';
import { TMDBService } from '../../services/tmdb.service';
import * as MoviesActions from './movies.actions';
import { MoviesService } from '../../services/movies.service';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private store: Store
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
