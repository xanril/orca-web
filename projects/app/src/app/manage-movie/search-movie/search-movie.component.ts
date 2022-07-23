import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../store';
import { SearchMovieResult } from '../../models/search-movie-result.model';
import { searchMovie, searchMovieReset } from '../store/search-movie.actions';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css'],
})
export class SearchMovieComponent implements OnInit, OnDestroy {
  searchResults?: SearchMovieResult[];
  searchedTitle?: string;
  maxPage: number = 1;
  currentPage: number = 1;
  storeSubscription?: Subscription;
  searchForm: FormGroup = new FormGroup({
    movieTitle: new FormControl(null, [Validators.required]),
  });

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.store.select('movies').subscribe((state) => {
      this.searchResults = state.searchMovieResponse?.results;
      this.searchedTitle = state.searchedMovieTitle;
      this.searchForm.controls['movieTitle'].setValue(this.searchedTitle);
      this.maxPage = state.searchMovieResponse?.total_pages ?? 1;
      this.currentPage = state.searchMovieResponse?.page ?? 1;
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
    this.store.dispatch(searchMovieReset());
  }

  onSearchMovie() {
    this.store.dispatch(
      searchMovie({
        movieTitle: this.searchForm.value['movieTitle'],
        page: 1,
      })
    );
  }

  onPagedSearchMovie(targetPage: number) {
    this.store.dispatch(
      searchMovie({
        movieTitle: this.searchedTitle ?? this.searchForm.value['movieTitle'],
        page: targetPage,
      })
    );
  }
}
