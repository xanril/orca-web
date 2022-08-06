import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Movie } from '../../../models/movie.model';
import * as MoviesPageActions from '../../store/movies-page.actions';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent implements OnInit {
  @Input() movieItem!: Movie;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  onClick() {
    this.store.dispatch(
      MoviesPageActions.setActiveMovie({
        movieId: this.movieItem.id,
      })
    );

    this.router.navigate(['/movies/detail', this.movieItem.id + '']);
  }
}
