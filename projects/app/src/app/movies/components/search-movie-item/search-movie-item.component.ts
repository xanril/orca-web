import { Component, Input, OnInit } from '@angular/core';
import { TMDBService } from '../../../services/tmdb.service';
import { SearchMovieResult } from '../../../models/search-movie-result.model';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import * as MoviesActions from '../../../store/movies/movies.actions';

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
    this.store.dispatch(MoviesActions.addMovie({
      searchMovieResult: this.resultItem,
      releaseDate: new Date(Date.now())
    }))

    this.isMovieAdded = true;
  }
}
