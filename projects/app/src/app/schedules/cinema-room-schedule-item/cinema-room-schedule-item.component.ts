import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Schedule } from '../../models/schedule.model';
import { Movie } from '../../models/movie.model';
import * as MoviesSelectors from '../../store/movies/movies.selectors';

@Component({
  selector: 'app-cinema-room-schedule-item',
  templateUrl: './cinema-room-schedule-item.component.html',
})
export class CinemaRoomScheduleItemComponent implements OnInit {
  scheduleItem: Schedule = {
    id: 0,
    cinemaId: 0,
    roomId: 0,
    movieId: 0,
    dayOfWeek: 0,
    startTime: new Date(2022, 9, 17, 11, 15, 0),
    endTime: new Date(2022, 9, 17, 14, 15, 0),
    ticketPrice: 200,
  };
  movieItem?: Movie;
  movieTitle: string = '';
  movieRuntime: string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(MoviesSelectors.selectMovies).subscribe((movies) => {
      this.movieItem = movies.find((m) => m.id === this.scheduleItem.movieId);
    });
  }
}
