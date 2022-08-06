import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Movie } from '../../models/movie.model';
import { TMDBService } from '../../services/tmdb.service';
import * as MoviesSelectors from '../../store/movies/movies.selectors';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject<void>();
  backdropImageUrl: string = '';
  posterImageUrl: string = '';
  movie!: Movie;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private tmdbService: TMDBService
  ) {}

  ngOnInit(): void {
    // const movieId = +this.route.snapshot.params['movieId'];
    this.route.params
      .pipe(
        takeUntil(this.unsubscribe$),
        map((params) => {
          return +params['movieId'];
        }),
        switchMap((movieId) => {
          return this.store.select(MoviesSelectors.selectMovieWithId(movieId));
        })
      )
      .subscribe((movie) => {
        this.movie = movie;
        this.backdropImageUrl = this.tmdbService.composeBackdropUrl(
          movie.backdropUrl
        );
        this.posterImageUrl = this.tmdbService.composePosterUrl(
          movie.posterUrl
        );
      });
  }

  editHandler() {
    this.router.navigate(['/movies/edit', this.movie.id + '']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
