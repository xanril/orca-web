import { Component, Input, OnInit } from '@angular/core';
import { TMDBService } from '../../shared/tmdb.service';
import { SearchMovieResult } from '../../models/search-movie-result.model';

@Component({
  selector: 'app-search-movie-item',
  templateUrl: './search-movie-item.component.html',
  styleUrls: ['./search-movie-item.component.css'],
})
export class SearchMovieItemComponent implements OnInit {
  @Input() resultItem!: SearchMovieResult;
  cardImageUrl!: string;

  constructor(private tmdbService: TMDBService) {}

  ngOnInit(): void {
    this.cardImageUrl = this.tmdbService.composePosterUrl(
      this.resultItem.poster_path!
    );

    console.log(this.cardImageUrl);
  }
}
