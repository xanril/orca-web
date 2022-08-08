import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Room } from '../../models/room.model';
import { Cinema } from '../../models/cinema.model';
import { Movie } from '../../models/movie.model';
import * as CinemaSelectors from '../../store/cinemas/cinema.selectors';
import * as MoviesSelectors from '../../store/movies/movies.selectors';
import * as CinemaActions from '../../store/cinemas/cinema.actions';

@Component({
  selector: 'app-add-cinema-room-schedule',
  templateUrl: './add-cinema-room-schedule.component.html',
})
export class AddCinemaRoomScheduleComponent implements OnInit, OnDestroy {
  cinemas$: Observable<Cinema[]> = new Observable<Cinema[]>();
  cinemaRoom$: Observable<Room[]> = new Observable<Room[]>();
  movies$: Observable<Movie[]> = new Observable<Movie[]>();
  movie!: Movie;
  ticketPrices: number[] = [];
  daysOfWeek: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  timeHour: string[] = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
  ];
  timeMinutes: string[] = ['00', '15', '30', '45'];
  timePeriod: string[] = ['AM', 'PM'];
  newScheduleForm!: FormGroup;
  subscriptionBag: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.cinemas$ = this.store.select(CinemaSelectors.selectAllCinemas);
    // this.cinemaRoom$ = this.store.select(
    //   CinemaSelectors.selectCinemaRoomsWithCinemaId(0)
    // );
    this.movies$ = this.store.select(MoviesSelectors.selectMovies);

    this.subscriptionBag.add(
      this.store
        .select(MoviesSelectors.selectMovieWithId(0))
        .subscribe((movie) => (this.movie = movie))
    );

    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.subscriptionBag.unsubscribe();
  }

  initializeForm() {
    this.newScheduleForm = new FormGroup({
      cinema: new FormControl('', [
        Validators.required,
        // Validators.pattern(/^[1-9]+[0-9]*$/), // nume
      ]),
      room: new FormControl('', [Validators.required]),
      movie: new FormControl('', [Validators.required]),
      dayOfWeek: new FormControl('0', [Validators.required]),
      timeHour: new FormControl('0', [Validators.required]),
      timeMinutes: new FormControl('0', [Validators.required]),
      timePeriod: new FormControl('0', [Validators.required]),
      ticketPrice: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });

    this.subscriptionBag.add(
      this.newScheduleForm.get('cinema')?.valueChanges.subscribe((newValue) => {
        const newCinemaId = +newValue;
        // this.cinemaRoom$ = this.store.select(
        //   CinemaSelectors.selectCinemaRoomsWithCinemaId(newCinemaId)
        // );

        this.newScheduleForm.get('room')?.setValue('');
      })
    );
  }

  onSubmit() {
    const cinemaId = this.newScheduleForm.get('cinema')?.value;
    const roomId = this.newScheduleForm.get('room')?.value;
    const movieId = this.newScheduleForm.get('movie')?.value;
    const dayOfWeek = this.newScheduleForm.get('dayOfWeek')?.value;
    const ticketPrice = this.newScheduleForm.get('ticketPrice')?.value;

    const timeHour = this.newScheduleForm.get('timeHour')?.value;
    const timeMinutes = this.newScheduleForm.get('timeMinutes')?.value;
    const timePeriod = this.newScheduleForm.get('timePeriod')?.value;

    const startTime = new Date(
      2022,
      0,
      0,
      timePeriod! === '1' ? +timeHour + 12 : +timeHour,
      +timeMinutes
    );

    const movieRuntimeMs = this.movie.runtime! * 60 * 1000; // mins x (secs per min) x 1000 (milliseconds)
    const endTime = new Date(startTime.getTime() + movieRuntimeMs);

    this.store.dispatch(
      CinemaActions.addCinemaRoomSchedule({
        cinemaId: cinemaId,
        cinemaRoomId: roomId,
        movieId: movieId,
        dayOfWeek: dayOfWeek,
        startTime: startTime,
        endTime: endTime,
        ticketPrice: ticketPrice,
      })
    );
  }
}
