import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
})
export class MovieEditComponent implements OnInit {
  movie!: Movie;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.movie = this.route.snapshot.data['movie'];
    // this.route.params
    //   .pipe(
    //     takeUntil(this.unsubscribe$),
    //     map((params) => {
    //       return +params['movieId'];
    //     }),
    //     switchMap((movieId) => {
    //       return this.store.select(MoviesSelectors.selectMovieWithId(movieId));
    //     })
    //   )
    //   .subscribe((movie) => {
    //     this.movie = movie;
    //     this.backdropImageUrl = this.tmdbService.composeBackdropUrl(
    //       movie.backdropUrl
    //     );
    //     this.posterImageUrl = this.tmdbService.composePosterUrl(
    //       movie.posterUrl
    //     );
    //   });
  }

}
