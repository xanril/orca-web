import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { AppState } from '../../store';
import * as AddMovieActions from './add-movie.actions';

@Injectable()
export class AddMovieEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddMovieActions.addMovie),
      withLatestFrom(this.store.select('movies')),
      map(([actionData, moviesState]) => {
        const newMovie: Movie = {
          id: moviesState.movies.length,
          tmdbId: actionData.searchMovieResult.id!,
          title: actionData.searchMovieResult.title!,
          overview: actionData.searchMovieResult.overview,
          posterUrl: actionData.searchMovieResult.poster_path,
          backdropUrl: actionData.searchMovieResult.backdrop_path,
          releaseDate: actionData.searchMovieResult.release_date?.toString()
        };

        return AddMovieActions.addMovieSuccess({
          movie: newMovie,
        });
      })
    )
  );
}
