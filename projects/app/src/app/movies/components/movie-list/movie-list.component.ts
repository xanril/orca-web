import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Movie } from '../../../models/movie.model';
import * as MoviesPageActions from '../../store/movies-page.actions';
import * as MoviesActions from '../../../store/movies/movies.actions';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
})
export class MovieListComponent implements OnInit {
  @Input() movies: Movie[] | null = [];
  @Input() activeMovieId: number | null = -1;
  @Output() onSearch: EventEmitter<void> = new EventEmitter<void>();

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  searchClick() {
    this.onSearch.emit();
  }

  itemClickHandler(itemId: number) {
    this.store.dispatch(
      MoviesPageActions.setActiveMovie({
        movieId: itemId,
      })
    );

    this.router.navigate(['/movies/detail', itemId]);
  }

  itemDeleteHandler(itemId: number) {
    this.store.dispatch(
      MoviesActions.deleteMovie({
        id: itemId,
      })
    );
  }
}
