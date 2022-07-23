import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { TMDBService } from '../../shared/tmdb.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent implements OnInit {
  @Input() movieItem!: Movie;
  posterImageUrl!: string;

  constructor(private tmdbService: TMDBService) {}

  ngOnInit(): void {
    this.posterImageUrl = this.tmdbService.composePosterUrl(
      this.movieItem.posterUrl!
    );
  }
}
