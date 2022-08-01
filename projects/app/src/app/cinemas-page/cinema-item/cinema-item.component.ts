import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Cinema } from '../../models/cinema.model';
import * as CinemaActions from '../store/cinema.actions';

@Component({
  selector: 'app-cinema-item',
  templateUrl: './cinema-item.component.html',
})
export class CinemaItemComponent implements OnInit {
  @Input() cinemaItem!: Cinema;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit(): void {
  }

  manageHandler() {
    this.store.dispatch(CinemaActions.setActiveCinema({
      cinema: this.cinemaItem
    }));

    this.router.navigate(['edit', this.cinemaItem.id + ''], {
      relativeTo: this.activatedRoute,
    });
  }
}
