import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../../models/movie.model';
import { Schedule } from '../../../models/schedule.model';
import * as MoviesSelectors from '../../../store/movies/movies.selectors';

@Component({
  selector: 'app-schedule-detail-item',
  templateUrl: './schedule-item.component.html',
  styles: [
  ]
})
export class ScheduleItemComponent implements OnInit {
  @Input() schedule!: Schedule
  movie$ = new Observable<Movie>();
  isFormShown = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.movie$ = this.store.select(MoviesSelectors.selectMovieWithId(this.schedule.movieId));
  }

  editHandler() {
    this.isFormShown = true;
  }

  deleteHandler() {}
}
