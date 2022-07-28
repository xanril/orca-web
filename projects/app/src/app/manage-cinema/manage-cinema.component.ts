import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Cinema } from '../models/cinema.model';
import * as cinemasFeature from './store/cinema.reducer';

@Component({
  selector: 'app-manage-cinema',
  templateUrl: './manage-cinema.component.html',
  styleUrls: ['./manage-cinema.component.css']
})
export class ManageCinemaComponent implements OnInit {
  cinemas: Cinema[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.store.select(cinemasFeature.selectCinemas)
    .subscribe((cinemas) => {
      this.cinemas = cinemas;
    })
  }

  addCinemaHandler(event: Event) {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }
}
