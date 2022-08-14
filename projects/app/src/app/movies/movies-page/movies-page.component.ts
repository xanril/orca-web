import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import * as MovieSelectors from '../../store/movies/movies.selectors';
import * as MoviesPageSelectors from '../store/movies-page.selectors';
import * as MoviesPageActions from '../store/movies-page.actions';

@Component({
  selector: 'app-movies-list-page',
  templateUrl: './movies-page.component.html',
})
export class MoviesListPageComponent implements OnInit, OnDestroy {
  movies$ = new Observable<Movie[]>();
  activeMovieId$ = new Observable<number>();

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movies$ = this.store.select(MovieSelectors.selectMovies);
    this.activeMovieId$ = this.store.select(MoviesPageSelectors.selectActiveMovieId);
  }

  ngOnDestroy(): void {
    this.store.dispatch(MoviesPageActions.resetActiveMovie());
  }

  searchClicked() {
    this.store.dispatch(MoviesPageActions.resetActiveMovie());
    this.router.navigate(['/movies/search']);
  }
}
