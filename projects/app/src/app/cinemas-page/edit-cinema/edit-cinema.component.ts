import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cinema } from '../../models/cinema.model';
import * as cinemasFeature from '../store/cinema.reducer';
import * as CinemaActions from '../store/cinema.actions';
import * as CinemaSelectors from '../store/cinema.selectors';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CinemaRoom } from '../../models/cinema-room.model';

@Component({
  selector: 'app-edit-cinema',
  templateUrl: './edit-cinema.component.html',
})
export class EditCinemaComponent implements OnInit, OnDestroy {
  cinema?: Cinema;
  cinemaRooms: CinemaRoom[] = [];
  editSuccessSubscription?: Subscription;
  selectCinemasSubscription?: Subscription;
  selectRoomsSubscription?: Subscription;
  editCinemaForm!: FormGroup;

  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectCinemasSubscription = this.store
      .select(cinemasFeature.selectCinemas)
      .subscribe((data) => {
        this.cinema = data[0];
        this.initializeForm();
      });

    this.selectRoomsSubscription = this.store
    .select(CinemaSelectors.selectVisibleRooms)
    .subscribe((data) => {
      this.cinemaRooms = data;
    })

    this.editSuccessSubscription = this.actions$
      .pipe(ofType(CinemaActions.editCinemaSuccess))
      .subscribe((data) => {
        alert('success!');
      });
  }

  ngOnDestroy(): void {
    this.selectCinemasSubscription?.unsubscribe();
    this.selectRoomsSubscription?.unsubscribe();
    this.editSuccessSubscription?.unsubscribe();
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
