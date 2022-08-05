import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import * as MovieSelectors from '../../store/movies/movies.selectors';

@Component({
  selector: 'app-movies-list-page',
  templateUrl: './movies-page.component.html',
})
export class MoviesListPageComponent implements OnInit {
  movies$: Observable<Movie[]> = new Observable<Movie[]>();

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movies$ = this.store.select(MovieSelectors.selectMovies);
  }

  searchClicked() {
    this.router.navigate(['/movies/search']);
  }
}
