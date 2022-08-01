import { Component, OnInit } from '@angular/core';
import { TMDBService } from '../../services/tmdb.service';
import { TMDBMovieDetails } from '../../models/tmdb-movie-details.model';

@Component({
  selector: 'app-manage-add-movie',
  templateUrl: './manage-add-movie.component.html',
})
export class ManageAddMovieComponent implements OnInit {
  backdropImageUrl: string = '';
  posterImageUrl: string = '';
  tmdbMovieDetails?: TMDBMovieDetails;

  constructor(private tmdbService: TMDBService) {}

  ngOnInit(): void {
    // this.tmdbService
    //   .getMovieDetails(123413)
    //   .subscribe((response: TMDBMovieDetails) => {
    //     this.tmdbMovieDetails = response;
    //     this.backdropImageUrl = this.tmdbService.composeBackdropUrl(
    //       response.backdrop_path!
    //     );
    //     this.posterImageUrl = this.tmdbService.composePosterUrl(
    //       response.poster_path!
    //     );
    //   });
    this.tmdbMovieDetails = mockDetails;
    this.backdropImageUrl = this.tmdbService.composeBackdropUrl(
      mockDetails.backdrop_path!
    );
    this.posterImageUrl = this.tmdbService.composePosterUrl(
      mockDetails.poster_path!
    );
  }

  handleChange(event: any) {
    console.log(event);
  }
}

const mockDetails: TMDBMovieDetails = {
  backdrop_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg', //7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg' p1F51Lvj3sMopG948F5HsBbl43C.jpg,
  genres: [
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 28,
      name: 'Action',
    },
  ],
  homepage: 'https://www.marvel.com/movies/avengers-endgame',
  id: 299534,
  overview:
    "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
  popularity: 300.908,
  poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
  release_date: new Date('2019-04-24'),
  runtime: 181,
  status: 'Released',
  tagline: 'Part of the journey is the end.',
  title: 'Avengers: Endgame',
  video: false,
  vote_average: 8.3,
  vote_count: 21344,
};
