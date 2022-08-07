import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, merge, Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import * as MoviesActions from '../../store/movies/movies.actions';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
})
export class MovieEditComponent implements OnInit {
  movie!: Movie;
  movieForm: FormGroup = new FormGroup({});
  monthOptions: string[] = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  yearOptions: number[] = [];
  dayOptions: number[] = [];
  dayOptions$: Observable<number[]> = new Observable<number[]>();

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.movie = this.route.snapshot.data['movie'];

    // convert release date to individual items.
    const releaseYear = this.movie.releaseDate.getUTCFullYear();
    const releaseMonth = this.movie.releaseDate.getUTCMonth();
    const releaseDay = this.movie.releaseDate.getUTCDate();

    const dateNow = new Date(Date.now());
    for (let index = 1980; index <= dateNow.getUTCFullYear(); index++) {
      this.yearOptions.push(index);
    }

    this.movieForm = new FormGroup({
      title: new FormControl(this.movie.title, [Validators.required]),
      runtime: new FormControl(this.movie.runtime),
      releaseYear: new FormControl(releaseYear),
      releaseMonth: new FormControl(releaseMonth),
      releaseDay: new FormControl(releaseDay),
      tagline: new FormControl(this.movie.tagline),
      overview: new FormControl(this.movie.overview),
      backdropUrl: new FormControl(this.movie.backdropUrl),
      posterUrl: new FormControl(this.movie.posterUrl),
    });

    this.dayOptions$ = merge(
      this.route.params,
      this.movieForm.get('releaseMonth')!.valueChanges,
      this.movieForm.get('releaseYear')!.valueChanges
    ).pipe(
      map(() => {
        const targetYear = +this.movieForm.get('releaseYear')?.value ?? 1980;
        const targetMonth = +this.movieForm.get('releaseMonth')?.value ?? 0;
        const totalDays = new Date(targetYear, targetMonth + 1, 0).getDate();

        console.log('month ' + (targetMonth + 1) + ' days: ' + totalDays);

        const newDayOptions: number[] = [];
        for (let index = 0; index < totalDays; index++) {
          newDayOptions.push(index + 1);
        }

        return newDayOptions;
      })
    );
  }

  submitHandler() {
    const updatedMovie = {
      ...this.movie,
    };

    // convert release date.
    const releaseYear = +this.movieForm.get('releaseYear')?.value;
    const releaseMonth = +this.movieForm.get('releaseMonth')?.value;
    const releaseDay = +this.movieForm.get('releaseDay')?.value;
    const newDate = new Date(releaseYear, releaseMonth, releaseDay);

    updatedMovie.backdropUrl = this.movieForm.get('backdropUrl')?.value;
    updatedMovie.overview = this.movieForm.get('overview')?.value;
    updatedMovie.posterUrl = this.movieForm.get('posterUrl')?.value;
    updatedMovie.runtime =
      +this.movieForm.get('runtime')?.value ?? this.movie.runtime;
    updatedMovie.tagline = this.movieForm.get('tagline')?.value;
    updatedMovie.title = this.movieForm.get('title')?.value;
    updatedMovie.releaseDate = newDate;

    this.store.dispatch(
      MoviesActions.updateMovie({ updatedMovie: updatedMovie })
    );
  }
}
