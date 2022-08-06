import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, merge, mergeWith } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { TMDBService } from '../../services/tmdb.service';
import * as MoviesActions from './movies.actions';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private tmdbService: TMDBService
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

  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.addMovie),
      switchMap((actionData) =>
        this.tmdbService.getMovieDetails(actionData.searchMovieResult.id).pipe(
          map((tmdbMovieDetails) => {
            // compose movie object
            const newMovie: Movie = {
              id: -1,
              tmdbId: actionData.searchMovieResult.id,
              title: actionData.searchMovieResult.title,
              tagline: tmdbMovieDetails.tagline ?? '',
              overview: tmdbMovieDetails.overview ?? '',
              runtime: tmdbMovieDetails.runtime ?? 0,
              posterUrl: actionData.searchMovieResult.poster_path,
              backdropUrl: actionData.searchMovieResult.backdrop_path,
              releaseDate: actionData.releaseDate,
              genre:
                tmdbMovieDetails.genres?.map((item) => item.name ?? '') ?? [],
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
          catchError((error) =>
            of(MoviesActions.deleteMoviesError({ error: error }))
          )
        );
      })
    )
  );
}
