import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Cinema } from '../../models/cinema.model';
import * as cinemasFeature from '../store/cinema.reducer';
import * as CinemaActions from '../store/cinema.actions';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-cinema',
  templateUrl: './edit-cinema.component.html',
})
export class EditCinemaComponent implements OnInit, OnDestroy {
  @ViewChild('targetForm') targetFormRef!: ElementRef;
  cinema?: Cinema;
  nameValue: string = 'default name';
  editSuccessSubscription?: Subscription;

  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select(cinemasFeature.selectCinemas).subscribe((data) => {
      this.cinema = data[0];
    });

    this.editSuccessSubscription = this.actions$
      .pipe(ofType(CinemaActions.editCinemaSuccess))
      .subscribe((data) => {
        alert("success!");
      });
  }

  ngOnDestroy(): void {
    this.editSuccessSubscription?.unsubscribe();
  }

  @HostListener('submit', ['$event'])
  submitHandler(event: Event) {
    event.preventDefault();

    if (this.targetFormRef.nativeElement !== event.target) {
      return;
    }

    // const data = serialize(this.targetFormRef.nativeElement);
    const data = { name: '', location: '' };
    const cinemaName: string = (data['name'] as string) ?? '';
    const cinemaLocation: string = (data['location'] as string) ?? '';

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
