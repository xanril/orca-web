import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CinemaRoom } from '../../models/cinema-room.model';
import { Cinema } from '../../models/cinema.model';
import { Movie } from '../../models/movie.model';
import { SCHEDULE_DAYS } from '../../models/schedule-day.model';
import { TICKET_PRICES } from '../../models/ticket-prices.model';
import * as CinemaSelectors from '../../store/cinemas/cinema.selectors';
import * as MoviesSelectors from '../../store/movies/movies.selectors';
@Component({
  selector: 'app-add-cinema-room-schedule',
  templateUrl: './add-cinema-room-schedule.component.html',
})
export class AddCinemaRoomScheduleComponent implements OnInit {
  cinemas$: Observable<Cinema[]> = new Observable<Cinema[]>();
  cinemaRoom$: Observable<CinemaRoom[]> = new Observable<CinemaRoom[]>();
  movies$: Observable<Movie[]> = new Observable<Movie[]>();
  ticketPrices: number[] = [];
  daysOfWeek: string[] = [];
  scheduleTimes: Date[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.cinemas$ = this.store.select(CinemaSelectors.selectCinemas);
    this.cinemaRoom$ = this.store.select(CinemaSelectors.selectCinemaRoomsWithCinemaId(0));
    this.movies$ = this.store.select(MoviesSelectors.selectMovies);

    this.ticketPrices = Object.keys(TICKET_PRICES)
      .filter((value) => isNaN(+value) === false)
      .map((item) => +item);
    
    this.daysOfWeek = Object.keys(SCHEDULE_DAYS).filter((value) => isNaN(+value));

    
  }

  private initializeTimeBrackets() {
    const millisecsPerMin15 = 1000 * 60 * 15;
    const startDate = new Date(2022, 0, 0, 9, 0, 0);
  }
}
