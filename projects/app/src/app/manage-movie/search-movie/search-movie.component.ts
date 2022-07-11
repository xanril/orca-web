import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TMDBService } from '../../shared/tmdb.service';
import {
  SearchMovieResponse,
  SearchMovieResult,
} from '../search-movie-result.model';

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

  constructor(private tmdbService: TMDBService) {}

  ngOnInit(): void {
    this.tmdbService
      .searchMovies("avengers")
      .subscribe((response: SearchMovieResponse) => {
        this.searchResults = response.results;
        this.target = response?.results?.[0];
        console.log(this.target);
      });
  }

  onSearchMovie() {
    console.log(this.searchForm.valid);
    this.tmdbService
      .searchMovies(this.searchForm.value['movieTitle'])
      .subscribe((response: SearchMovieResponse) => {
        this.searchResults = response.results;
        this.target = response?.results?.[0];
        console.log(this.target);
      });
  }
}
