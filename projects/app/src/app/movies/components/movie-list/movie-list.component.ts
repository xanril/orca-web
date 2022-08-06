import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Movie } from '../../../models/movie.model';
import * as MoviesPageActions from '../../store/movies-page.actions';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
})
export class MovieListComponent implements OnInit {
  @Input() movies: Movie[] | null = [];
  @Input() activeMovieId: number | null = -1;
  @Output() onSearch: EventEmitter<void> = new EventEmitter<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {}

  searchClick() {
    this.onSearch.emit();
  }
}
