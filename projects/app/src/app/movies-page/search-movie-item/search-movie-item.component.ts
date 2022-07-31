import { Component, Input, OnInit } from '@angular/core';
import { TMDBService } from '../../shared/tmdb.service';
import { SearchMovieResult } from '../../models/search-movie-result.model';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import * as MoviesPageActions from '../store/movies-page.actions';

@Component({
  selector: 'app-search-movie-item',
  templateUrl: './search-movie-item.component.html',
})
export class SearchMovieItemComponent implements OnInit {
  @Input() resultItem!: SearchMovieResult;
  cardImageUrl!: string;
  isMovieAdded: boolean = false;

  constructor(private tmdbService: TMDBService,
    private store: Store<AppState>) {}

  ngOnInit(): void {
    this.cardImageUrl = this.tmdbService.composePosterUrl(
      this.resultItem.poster_path!
    );

    this.isMovieAdded = this.resultItem.isAdded ?? false;
  }

  onAddMovie() {
    this.store.dispatch(MoviesPageActions.addMovie({
      searchMovieResult: this.resultItem
    }))

    this.isMovieAdded = true;
  }
}
