import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as SearchMovieActions from '../store/search-movie.actions';

@Component({
  selector: 'app-search-movie-form',
  templateUrl: './search-movie-form.component.html',
  styleUrls: ['./search-movie-form.component.css']
})
export class SearchMovieFormComponent implements OnInit {
  searchMovieForm: FormGroup = new FormGroup({
    queryTitle: new FormControl('', [Validators.required])
  })

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  searchMovieHandler() {
    if (!this.searchMovieForm.valid) {
      return;
    }

    this.store.dispatch(
      SearchMovieActions.searchMovie({
        movieTitle: this.searchMovieForm.value['queryTitle'],
        page: 1,
      })
    );
  }
}
