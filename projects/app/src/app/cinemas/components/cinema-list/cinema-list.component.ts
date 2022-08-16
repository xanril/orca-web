import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Cinema } from '../../../models/cinema.model';
import * as CinemasPageActions from '../../store/cinemas-page.actions';
import * as CinemasActions from '../../../store/cinemas/cinema.actions';

@Component({
  selector: 'app-cinema-list',
  templateUrl: './cinema-list.component.html',
  styleUrls: ['./cinema-list.component.css'],
})
export class CinemaListComponent implements OnInit {
  @Input() cinemas: Cinema[] | null = [];
  @Input() activeCinemaId: number | null = -1;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

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

    if (id === this.activeCinemaId) {
      this.store.dispatch(CinemasPageActions.resetActiveCinemaId());
      this.router.navigate(['/cinemas']);
    }
  }

  addCinemaHandler(name: string) {
    this.store.dispatch(
      CinemasActions.addCinema({
        cinema: {
          id: -1,
          location: '',
          name: name,
        },
      })
    );
  }
}
