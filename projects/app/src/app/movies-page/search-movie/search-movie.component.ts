import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../store';
import { SearchMovieResult } from '../../models/search-movie-result.model';
import { searchMovie, searchMovieReset } from '../store/movies-page.actions';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
})
export class SearchMovieComponent implements OnInit, OnDestroy {
  searchResults: SearchMovieResult[] = [];
  searchedTitle?: string;
  maxPage: number = 1;
  currentPage: number = 1;
  storeSubscription?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.store.select('movies').subscribe((state) => {

      if (state.searchedMovieTitle === '') {
        return;
      }

      this.searchResults = state.searchMovieResponse.results ?? [];
      this.searchedTitle = state.searchedMovieTitle;
      this.maxPage = state.searchMovieResponse?.total_pages ?? 1;
      this.currentPage = state.searchMovieResponse?.page ?? 1;
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
    this.store.dispatch(searchMovieReset());
  }

  onPagedSearchMovie(targetPage: number) {
    this.store.dispatch(
      searchMovie({
        movieTitle: this.searchedTitle ?? '',
        page: targetPage,
      })
    );
  }
}
