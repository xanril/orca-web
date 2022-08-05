import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
    private route: ActivatedRoute,
    private tmdbService: TMDBService
  ) {}

  ngOnInit(): void {
    const movieId = +this.route.snapshot.params['movieId'];
    this.store
      .select(MoviesSelectors.selectMovieWithId(movieId))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((movie) => {
        this.movie = movie;
        this.backdropImageUrl = this.tmdbService.composeBackdropUrl(movie.backdropUrl);
        this.posterImageUrl = this.tmdbService.composePosterUrl(movie.posterUrl)
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
