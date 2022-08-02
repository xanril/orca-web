import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cinema } from '../../models/cinema.model';
import * as cinemasFeature from '../store/cinema.reducer';
import * as CinemaActions from '../store/cinema.actions';
import * as CinemaSelectors from '../store/cinema.selectors';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CinemaRoom } from '../../models/cinema-room.model';

@Component({
  selector: 'app-edit-cinema',
  templateUrl: './edit-cinema.component.html',
})
export class EditCinemaComponent implements OnInit, OnDestroy {
  cinema?: Cinema;
  cinemaRooms: CinemaRoom[] = [];
  subscriptionBag: Subscription = new Subscription();
  editCinemaForm!: FormGroup;

  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const cinemaId = +this.route.snapshot.params['id'];

    this.subscriptionBag.add(
      this.store
        .pipe(CinemaSelectors.selectCinemaWithId(cinemaId))
        .subscribe((data) => {
          this.cinema = data;
          this.initializeForm();
        })
    );

    this.subscriptionBag.add(
      this.store
        .pipe(CinemaSelectors.selectVisibleRooms(cinemaId))
        .subscribe((data) => {
          this.cinemaRooms = data.slice();
        })
    );

    this.subscriptionBag.add(
      this.actions$
        .pipe(ofType(CinemaActions.editCinemaSuccess))
        .subscribe((data) => {
          alert('success!');
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptionBag.unsubscribe();
  }

  initializeForm() {
    this.editCinemaForm = new FormGroup({
      name: new FormControl(this.cinema?.name, [Validators.required]),
      location: new FormControl(this.cinema?.location, [Validators.required]),
    });
  }

  submitHandler() {
    if (!this.editCinemaForm.valid) {
      return;
    }

    const cinemaName: string = this.editCinemaForm.controls['name'].value;
    const cinemaLocation: string =
      this.editCinemaForm.controls['location'].value;

    this.store.dispatch(
      CinemaActions.editCinema({
        id: this.cinema!.id,
        name: cinemaName,
        location: cinemaLocation,
      })
    );
  }

  navigateToCinemas() {
    this.router.navigate(['/cinemas']);
  }
}
