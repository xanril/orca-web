import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MoviesActions from './store/movies/movies.actions';
import * as CinemasActions from './store/cinemas/cinema.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(MoviesActions.loadMovies());
    this.store.dispatch(CinemasActions.loadCinemas());
  }
}
