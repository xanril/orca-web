import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Cinema } from '../../../models/cinema.model';
import * as CinemasPageActions from '../../store/cinemas-page.actions';
import * as CinemasActions from '../../../store/cinemas/cinema.actions';

@Component({
  selector: 'app-cinema-list',
  templateUrl: './cinema-list.component.html',
})
export class CinemaListComponent implements OnInit {
  @Input() cinemas: Cinema[] | null = [];
  @Input() activeCinemaId: number | null = -1;
  @Output() onAddCinemaClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  addCinemaHandler() {
    this.onAddCinemaClick.emit();
  }

  itemClickHandler(id: number) {
    this.store.dispatch(CinemasPageActions.setActiveCinema({ cinemaId: id }));
    this.router.navigate(['/cinemas/detail', id]);
  }

  itemDeleteHandler(id: number) {
    this.store.dispatch(
      CinemasActions.deleteCinema({
        cinemaId: id,
      })
    );
  }
}
