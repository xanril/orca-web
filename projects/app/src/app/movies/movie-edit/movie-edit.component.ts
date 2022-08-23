import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, merge, mergeMap, Observable, Subject, takeUntil } from 'rxjs';
import { Movie } from '../../models/movie.model';
import * as MoviesActions from '../../store/movies/movies.actions';
import * as MoviesSelectors from '../../store/movies/movies.selectors';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
})
export class MovieEditComponent implements OnInit {
  unsubscribe$ = new Subject<void>();
  dayOptions$ = new Observable<number[]>();
  movie!: Movie;
  movieForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    runtime: new FormControl(''),
    releaseYear: new FormControl(''),
    releaseMonth: new FormControl(''),
    releaseDay: new FormControl(''),
    tagline: new FormControl(''),
    overview: new FormControl(''),
    backdropUrl: new FormControl(''),
    posterUrl: new FormControl(''),
  });
  // prettier-ignore
  monthOptions: string[] = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
  ];
  dayOptions: number[] = [];
  yearOptions: number[] = [];

  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.unsubscribe$),
        mergeMap((params) => {
          const movieId = +params['movieId'];
          return this.store.select(MoviesSelectors.selectMovieWithId(movieId));
        })
      )
      .subscribe((movie) => {
        this.movie = movie;

        // convert release date to individual items.
        const releaseDate = new Date(this.movie.releaseDate);
        const releaseYear = releaseDate.getUTCFullYear();
        const releaseMonth = releaseDate.getUTCMonth();
        const releaseDay = releaseDate.getUTCDate();

        const dateNow = new Date(Date.now());
        for (let index = 1980; index <= dateNow.getFullYear(); index++) {
          this.yearOptions.push(index);
        }

        this.movieForm.get('title')?.setValue(this.movie.title);
        this.movieForm.get('runtime')?.setValue(this.movie.runtime);
        this.movieForm.get('releaseYear')?.setValue(releaseYear);
        this.movieForm.get('releaseMonth')?.setValue(releaseMonth);
        this.movieForm.get('releaseDay')?.setValue(releaseDay);
        this.movieForm.get('tagline')?.setValue(this.movie.tagline);
        this.movieForm.get('overview')?.setValue(this.movie.overview);
        this.movieForm.get('backdropUrl')?.setValue(this.movie.backdropUrl);
        this.movieForm.get('posterUrl')?.setValue(this.movie.posterUrl);

        this.dayOptions$ = merge(
          this.route.params,
          this.movieForm.get('releaseMonth')!.valueChanges,
          this.movieForm.get('releaseYear')!.valueChanges
        ).pipe(
          map(() => {
            const targetYear = +this.movieForm.get('releaseYear')?.value ?? 1980;
            const targetMonth = +this.movieForm.get('releaseMonth')?.value ?? 0;
            const totalDays = new Date(targetYear, targetMonth + 1, 0).getDate();

            const newDayOptions: number[] = [];
            for (let index = 0; index < totalDays; index++) {
              newDayOptions.push(index + 1);
            }

            return newDayOptions;
          })
        );
      });
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
    updatedMovie.runtime = +this.movieForm.get('runtime')?.value ?? this.movie.runtime;
    updatedMovie.tagline = this.movieForm.get('tagline')?.value;
    updatedMovie.title = this.movieForm.get('title')?.value;
    updatedMovie.releaseDate = newDate;

    this.store.dispatch(MoviesActions.updateMovie({ updatedMovie: updatedMovie }));
  }

  cancelHandler() {
    this.router.navigate(['/movies/detail', this.movie.id]);
  }
}
