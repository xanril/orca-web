import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TMDBService } from '../../shared/tmdb.service';
import { SearchMovieResponse } from '../search-movie-result.model';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({
    movieTitle: new FormControl(null, [Validators.required]),
  });

  constructor(private tmdbService: TMDBService) {}

  ngOnInit(): void {}

  onSearchMovie() {
    console.log(this.searchForm.valid);
    this.tmdbService.searchMovies(this.searchForm.value['movieTitle'])
      .subscribe((response: SearchMovieResponse) => {
        console.log(response);
      });
  }
}
