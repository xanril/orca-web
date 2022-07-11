import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TMDBService } from '../../shared/tmdb.service';
import { AppState } from '../../store';
import {
  SearchMovieResponse,
  SearchMovieResult,
} from '../search-movie-result.model';
import { searchMovie } from '../store/manage-movie.actions';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css'],
})
export class SearchMovieComponent implements OnInit {
  searchResults?: SearchMovieResult[];
  target?: SearchMovieResult;
  searchForm: FormGroup = new FormGroup({
    movieTitle: new FormControl(null, [Validators.required]),
  });

  constructor(private tmdbService: TMDBService,
    private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.tmdbService
    //   .searchMovies("avengers")
    //   .subscribe((response: SearchMovieResponse) => {
    //     this.searchResults = response.results;
    //     this.target = response?.results?.[0];
    //     console.log(this.target);
    //   });

    this.store.select('manageMovie')
      .subscribe(state => {
        this.searchResults = state.searchMovieResponse?.results;
        this.target = state.searchMovieResponse?.results?.[0];
      })
  }

  onSearchMovie() {
    // this.tmdbService
    //   .searchMovies(this.searchForm.value['movieTitle'])
    //   .subscribe((response: SearchMovieResponse) => {
    //     this.searchResults = response.results;
    //     this.target = response?.results?.[0];
    //     console.log(this.target);
    //   });

    this.store.dispatch(searchMovie({ movieTitle: this.searchForm.value['movieTitle'] }));
  }
}
