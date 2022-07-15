import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../store';
import {
  SearchMovieResult,
} from '../../models/search-movie-result.model';
import { searchMovie } from '../store/search-movie.actions';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css'],
})
export class SearchMovieComponent implements OnInit, OnDestroy {
  searchResults?: SearchMovieResult[];
  storeSubscription?: Subscription;
  searchForm: FormGroup = new FormGroup({
    movieTitle: new FormControl(null, [Validators.required]),
  });

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('movies')
      .subscribe((state) => {
        this.searchResults = state.searchMovieResponse?.results;
      });
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
  }

  onSearchMovie() {
    this.store.dispatch(
      searchMovie({ movieTitle: this.searchForm.value['movieTitle'] })
    );
  }
}
