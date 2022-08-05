import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html'
})
export class MovieListComponent implements OnInit {
  @Input() movies: Movie[] | null = [];
  @Output() onSearch: EventEmitter<void> = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }

  searchClick() {
    this.onSearch.emit();
  }
}
