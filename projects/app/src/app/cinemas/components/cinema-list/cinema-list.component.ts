import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cinema } from '../../../models/cinema.model';
import * as CinemasPageActions from '../../store/cinemas-page.actions';

@Component({
  selector: 'app-cinema-list',
  templateUrl: './cinema-list.component.html',
})
export class CinemaListComponent implements OnInit {
  @Input() cinemas: Cinema[] | null = [];
  @Output() onAddCinemaClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {}

  addCinemaHandler() {
    this.onAddCinemaClick.emit();
  }

  itemClickHandler(id: number) {
    this.store.dispatch(CinemasPageActions.setActiveCinema({ cinemaId: id }));
  }

  itemDeleteHandler(id: number) {}
}
