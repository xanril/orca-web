import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { serialize } from '@shoelace-style/shoelace/dist/utilities/form.js';
import { defer, interval, Subscription, withLatestFrom } from 'rxjs';
import { AppState } from '../../store';
import * as TheaterActions from '../store/theater.actions';

@Component({
  selector: 'app-add-theater',
  templateUrl: './add-theater.component.html',
  styleUrls: ['./add-theater.component.css'],
})
export class AddTheaterComponent implements OnInit, OnDestroy {
  @ViewChild('targetForm') targetForm!: ElementRef;
  successSubscription?: Subscription;

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.successSubscription = this.actions$
      .pipe(ofType(TheaterActions.addTheaterSuccess))
      .subscribe((data) => {
        console.log('navigate!');
        this.navigateToTheater();
      });
  }

  ngOnDestroy(): void {
    this.successSubscription?.unsubscribe();
  }

  @HostListener('submit', ['$event'])
  submitHandler(event: Event) {
    event.preventDefault();
    if (this.targetForm.nativeElement !== event.target) {
      return;
    }

    const data = serialize(this.targetForm.nativeElement);
    const theaterName: string = (data['name'] as string) ?? '';
    const theaterLocation: string = (data['location'] as string) ?? '';

    if (!theaterName || !theaterLocation) {
      return; // either info is null or empty?
    }

    this.store.dispatch(
      TheaterActions.addTheater({
        name: theaterName,
        location: theaterLocation,
      })
    );
  }

  navigateToTheater() {
    this.router.navigate(['/theaters']);
  }
}
