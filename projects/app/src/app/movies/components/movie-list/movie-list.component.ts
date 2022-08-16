import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
})
export class MovieListComponent implements OnInit {
  @Input() movies: Movie[] | null = [];
  @Input() activeMovieId: number | null = -1;
  @Output() onSearch = new EventEmitter<void>();
  @Output() onItemClick = new EventEmitter<number>();
  @Output() onItemDelete = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  searchClick() {
    this.onSearch.emit();
  }

  itemClickHandler(itemId: number) {
    this.onItemClick.emit(itemId);
  }

  itemDeleteHandler(itemId: number) {
    this.onItemDelete.emit(itemId);
  }
}
