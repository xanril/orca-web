import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of } from 'rxjs';
import { SearchMovieResult } from '../../models/search-movie-result.model';
import { TMDBService } from '../../shared/tmdb.service';
import { AppState } from '../../store';
import * as SearchMovieActions from './search-movie.actions';

@Injectable()
export class ManageMovieEffects {
  constructor(
    private actions$: Actions,
    private tmdbService: TMDBService,
    private store: Store<AppState>
  ) {}

  searchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchMovieActions.searchMovie),
      switchMap((actionData) => {
        return this.tmdbService
          .searchMovie(actionData.movieTitle, actionData.page)
          .pipe(
            map((response) => {
              // check if result items are already added to movie collection
              response.results = this.checkIfMovieResultExists(
                response.results
              );

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
