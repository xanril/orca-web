import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cinema } from '../../models/cinema.model';
import * as CinemasSelectors from '../../store/cinemas/cinema.selectors';

@Component({
  selector: 'app-manage-cinema',
  templateUrl: './cinemas-page.component.html',
})
export class CinemasPageComponent implements OnInit {
  cinemas$: Observable<Cinema[]> = new Observable<Cinema[]>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.cinemas$ = this.store.select(CinemasSelectors.selectCinemas);
  }

  addCinemaHandler() {
    //this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }
}
