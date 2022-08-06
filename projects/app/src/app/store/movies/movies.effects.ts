import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, withLatestFrom } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { SearchMovieResult } from '../../models/search-movie-result.model';
import { TMDBService } from '../../services/tmdb.service';
import { AppState } from '..';
import * as MoviesPageActions from './movies.actions';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private tmdbService: TMDBService,
    private store: Store<AppState>
  ) {}

}
