import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, tap, withLatestFrom } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { TMDBService } from '../../services/tmdb.service';
import * as MoviesActions from './movies.actions';
import * as MoviesSelectors from './movies.selectors';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private tmdbService: TMDBService,
    private router: Router,
    private store: Store
  ) {}

  loadMovies$ = createEffect(() =>
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

  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.addMovie),
      switchMap((actionData) =>
        this.tmdbService.getMovieDetails(actionData.searchMovieResult.id).pipe(
          map((tmdbMovieDetails) => {
            const newMovie: Movie = {
              id: 0,
              tmdbId: actionData.searchMovieResult.id,
              title: actionData.searchMovieResult.title,
              tagline: tmdbMovieDetails.tagline ?? '',
              overview: tmdbMovieDetails.overview ?? '',
              runtime: tmdbMovieDetails.runtime ?? 0,
              posterUrl: actionData.searchMovieResult.poster_path,
              backdropUrl: actionData.searchMovieResult.backdrop_path,
              releaseDate: new Date(tmdbMovieDetails.release_date),
            };

            return newMovie;
          })
        )
      ),
      switchMap((newMovie: Movie) => {
        return this.moviesService.addMovie(newMovie).pipe(
          map((response) => {
            return MoviesActions.addMovieSuccess({
              movie: response,
            });
          }),
          catchError((error) => {
            return of(MoviesActions.addMoviesError({ error }));
          })
        );
      })
    )
  );

  deleteMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.deleteMovie),
      switchMap((actionData) => {
        return this.moviesService.deleteMovie(actionData.id).pipe(
          map((response) => {
            return MoviesActions.deleteMovieSuccess({ id: response });
          }),
          catchError((error) => of(MoviesActions.deleteMoviesError({ error: error })))
        );
      })
    )
  );

  updateMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesActions.updateMovie),
      switchMap((actionData) =>
        this.moviesService.updateMovie(actionData.updatedMovie).pipe(
          map((data) => MoviesActions.updateMovieSuccess({ updatedMovie: data! })),
          catchError((error) => of(MoviesActions.updateMoviesError({ error })))
        )
      )
    );
  });

  updateMovieSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MoviesActions.updateMovieSuccess),
        tap((actionData) => this.router.navigate(['/movies/detail', actionData.updatedMovie.id]))
      );
    },
    {
      dispatch: false,
    }
  );
}
