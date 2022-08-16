import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TMDBService } from '../../../services/tmdb.service';
import { SearchMovieResult } from '../../../models/search-movie-result.model';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-movie-item',
  templateUrl: './search-movie-item.component.html',
})
export class SearchMovieItemComponent implements OnInit, OnChanges {
  @Input() resultItem!: SearchMovieResult;
  @Output() onAddMovie = new EventEmitter<SearchMovieResult>();
  cardImageUrl = '';
  isMovieAdded = false;

  constructor(private tmdbService: TMDBService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initialize();
  }

  initialize() {
    this.cardImageUrl = this.tmdbService.composePosterUrl(this.resultItem.poster_path!);
    this.isMovieAdded = this.resultItem.isAdded ?? false;
  }

  addMovieHandler() {
    this.onAddMovie.emit(this.resultItem);
    this.isMovieAdded = true;
  }
}
