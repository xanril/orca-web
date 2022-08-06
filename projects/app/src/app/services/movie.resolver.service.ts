import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Movie } from '../models/movie.model';
import * as MoviesSelectors from '../store/movies/movies.selectors';

@Injectable({
  providedIn: 'root',
})
export class MovieResolverService implements Resolve<Movie> {
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Movie> {
    const movieId = route.params['movieId'];
    console.log("resolve: " + movieId);
    return this.store
      .select(MoviesSelectors.selectMovieWithId(+movieId))
      .pipe(take(1));
  }
}
