import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CinemaRoom } from '../../models/cinema-room.model';
import { Cinema } from '../../models/cinema.model';
import { Movie } from '../../models/movie.model';
import { TICKET_PRICES } from '../../models/ticket-prices.model';
import * as CinemaSelectors from '../../store/cinemas/cinema.selectors';
import * as MoviesSelectors from '../../store/movies/movies.selectors';

@Component({
  selector: 'app-add-cinema-room-schedule',
  templateUrl: './add-cinema-room-schedule.component.html',
})
export class AddCinemaRoomScheduleComponent implements OnInit, OnDestroy {
  cinemas$: Observable<Cinema[]> = new Observable<Cinema[]>();
  cinemaRoom$: Observable<CinemaRoom[]> = new Observable<CinemaRoom[]>();
  movies$: Observable<Movie[]> = new Observable<Movie[]>();
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
    this.cinemas$ = this.store.select(CinemaSelectors.selectCinemas);
    this.cinemaRoom$ = this.store.select(
      CinemaSelectors.selectCinemaRoomsWithCinemaId(0)
    );
    this.movies$ = this.store.select(MoviesSelectors.selectMovies);

    this.ticketPrices = Object.keys(TICKET_PRICES)
      .filter((value) => isNaN(+value) === false)
      .map((item) => +item);

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
      ticketPrice: new FormControl('0', [Validators.required]),
    });

    this.subscriptionBag.add(
      this.newScheduleForm
        .get('cinema')
        ?.valueChanges.subscribe((newValue) => {

          const newCinemaId = +newValue;
          this.cinemaRoom$ = this.store.select(
            CinemaSelectors.selectCinemaRoomsWithCinemaId(newCinemaId)
          );

          this.newScheduleForm.get('room')?.setValue('');
        })
    );
  }

  onSubmit() {
    console.log('cinema: ' + this.newScheduleForm.get('cinema')?.valid);
    console.log('room: ' + this.newScheduleForm.get('room')?.valid);
    console.log('movie: ' + this.newScheduleForm.get('movie')?.valid);
    console.log('dayOfWeek: ' + this.newScheduleForm.get('dayOfWeek')?.valid);
    console.log('timeHour: ' + this.newScheduleForm.get('timeHour')?.valid);
    console.log('timeMinutes: ' + this.newScheduleForm.get('timeMinutes')?.valid);
    console.log('timePeriod: ' + this.newScheduleForm.get('timePeriod')?.valid);
    console.log('ticketPrice: ' + this.newScheduleForm.get('ticketPrice')?.valid);
    
    console.log('form: ' + this.newScheduleForm.valid);
    console.log(this.newScheduleForm);
  }
}
