import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-movie-form',
  templateUrl: './search-movie-form.component.html',
})
export class SearchMovieFormComponent implements OnInit {
  @Output() onSearch = new EventEmitter<string>();
  searchMovieForm = new FormGroup({
    queryTitle: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  submitHandler() {
    const movieQuery = this.searchMovieForm.get('queryTitle')?.value;
    this.onSearch.emit(movieQuery);
  }
}
