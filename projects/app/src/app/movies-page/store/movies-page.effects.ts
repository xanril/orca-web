import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, withLatestFrom } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { SearchMovieResult } from '../../models/search-movie-result.model';
import { TMDBService } from '../../services/tmdb.service';
import { AppState } from '../../store';
import * as MoviesPageActions from './movies-page.actions';

@Injectable()
export class MoviesPageEffects {
  constructor(
    private actions$: Actions,
    private tmdbService: TMDBService,
    private store: Store<AppState>
  ) {}

  searchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesPageActions.searchMovie),
      switchMap((actionData) => {
        return this.tmdbService
          .searchMovie(actionData.movieTitle, actionData.page)
          .pipe(
            map((response) => {
              // check if result items are already added to movie collection
              response.results = this.checkIfMovieResultExists(
                response.results
              );

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

  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesPageActions.addMovie),
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

        return MoviesPageActions.addMovieSuccess({
          movie: newMovie,
        });
      })
    )
  );

  checkIfMovieResultExists(searchMovieResults?: SearchMovieResult[]) {
    let newResults: SearchMovieResult[] | undefined = [];

    this.store.select('movies').subscribe((moviesState) => {
      newResults = searchMovieResults?.map((item) => {
        let existingMovie = moviesState.movies.find(
          (movie) => movie.tmdbId === item.id
        );

        return {
          ...item,
          isAdded: existingMovie !== undefined
        };
      });
    });

    return newResults;
  }


}
