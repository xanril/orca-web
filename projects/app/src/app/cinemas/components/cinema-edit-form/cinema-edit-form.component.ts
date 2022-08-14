import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Cinema } from '../../../models/cinema.model';
import * as CinemasActions from '../../../store/cinemas/cinema.actions';

@Component({
  selector: 'app-cinema-edit-form',
  templateUrl: './cinema-edit-form.component.html',
  styles: [],
})
export class CinemaEditFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() cinema: Cinema | null = null;
  unsubscribe$ = new Subject<void>();
  isFormShown = false;
  displayedName = '';
  displayedLocation = '';
  cinemaForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    location: new FormControl(''),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.setDisplayedValueFromCinema();

    this.cinemaForm
      .get('name')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.displayedName = value;
      });

    this.cinemaForm
      .get('location')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.displayedLocation = value;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setDisplayedValueFromCinema();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setDisplayedValueFromCinema() {
    this.displayedName = this.cinema?.name ?? '';
    this.displayedLocation = this.cinema?.location ?? '';
  }

  startEditHandler() {
    this.cinemaForm.patchValue({
      name: this.cinema?.name,
      location: this.cinema?.location,
    });

    this.isFormShown = true;
  }

  cancelHandler() {
    this.setDisplayedValueFromCinema();
    this.isFormShown = false;
  }

  submitHandler() {
    if (!this.cinemaForm.valid) {
      return;
    }

    this.store.dispatch(
      CinemasActions.editCinema({
        cinema: {
          id: this.cinema?.id ?? -1,
          name: this.cinemaForm.get('name')?.value,
          location: this.cinemaForm.get('location')?.value,
        },
      })
    );

    this.isFormShown = false;
  }
}
