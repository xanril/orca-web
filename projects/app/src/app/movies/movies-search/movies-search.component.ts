import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SearchMovieResponse } from '../../models/search-movie-result.model';
import * as MoviesPageActions from '../store/movies-page.actions';
import * as MoviesPageSelectors from '../store/movies-page.selectors';

@Component({
  selector: 'app-search-movie',
  templateUrl: './movies-search.component.html',
})
export class MoviesSearchComponent implements OnInit, OnDestroy {
  searchResponse$ = new Observable<SearchMovieResponse | null>();
  searchedTitle = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchResponse$ = this.store.select(MoviesPageSelectors.selectSearchResponse);
  }

  ngOnDestroy(): void {
    this.store.dispatch(MoviesPageActions.resetSearch());
  }

  searchHandler(movieQuery: string) {
    this.store.dispatch(
      MoviesPageActions.setSearchMovieQuery({
        movieQuery: movieQuery,
      })
    );

    this.onPagedSearchMovie(1);
  }

  onPagedSearchMovie(targetPage: number) {
    this.store.dispatch(
      MoviesPageActions.searchMovie({
        page: targetPage,
      })
    );
  }
}
