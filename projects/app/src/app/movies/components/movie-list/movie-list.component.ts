import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html'
})
export class MovieListComponent implements OnInit {
  @Input() movies: Movie[] | null = [];
  
  constructor() { }

  ngOnInit(): void {
  }
}
