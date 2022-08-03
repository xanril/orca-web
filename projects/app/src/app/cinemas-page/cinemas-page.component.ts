import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Cinema } from '../models/cinema.model';
import * as cinemasFeature from '../store/cinemas/cinemas.reducer';

@Component({
  selector: 'app-manage-cinema',
  templateUrl: './cinemas-page.component.html',
})
export class CinemasPageComponent implements OnInit {
  cinemas: Cinema[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(cinemasFeature.selectCinemas).subscribe((cinemas) => {
      this.cinemas = cinemas;
    });
  }

  addCinemaHandler(event: Event) {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }
}
