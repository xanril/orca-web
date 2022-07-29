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
import { Store } from '@ngrx/store';
import { serialize } from '@shoelace-style/shoelace/dist/utilities/form.js';
import { Subscription } from 'rxjs';
import { AppState } from '../../store';
import * as CinemaActions from '../store/cinema.actions';

@Component({
  selector: 'app-add-cinema',
  templateUrl: './add-cinema.component.html',
})
export class AddCinemaComponent implements OnInit, OnDestroy {
  @ViewChild('targetForm') targetForm!: ElementRef;
  successSubscription?: Subscription;
  roomInputNames: { key: string; name: string }[] = [];
  nextRoomId: number = 1;

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.successSubscription = this.actions$
      .pipe(ofType(CinemaActions.addCinemaSuccess))
      .subscribe((data) => {
        this.navigateToCinemas();
      });
  }

  ngOnDestroy(): void {
    this.successSubscription?.unsubscribe();
  }

  submitRoomNameHandler(value: { key: string; name: string }) {
    this.roomInputNames.push({ key: value.key, name: value.name });
  }

  removeRoomNameHandler(roomItemId: string) {
    let roomIndex = this.roomInputNames.findIndex(
      (item) => item.key == roomItemId
    );
    this.roomInputNames.splice(roomIndex, 1);
  }

  editRoomNameHandler(value: { key: string; name: string }) {
    let roomIndex = this.roomInputNames.findIndex(
      (item) => item.key == value.key
    );
    this.roomInputNames[roomIndex].name = value.name;
  }

  @HostListener('submit', ['$event'])
  submitHandler(event: Event) {
    event.preventDefault();
    if (this.targetForm.nativeElement !== event.target) {
      return;
    }

    const data = serialize(this.targetForm.nativeElement);
    const cinemaName: string = (data['name'] as string) ?? '';
    const cinemaLocation: string = (data['location'] as string) ?? '';

    if (!cinemaName || !cinemaLocation || this.roomInputNames.length === 0) {
      return; // either info is null or empty?
    }

    this.store.dispatch(
      CinemaActions.addCinema({
        name: cinemaName,
        location: cinemaLocation,
        roomNames: this.roomInputNames.map((roomItem) => roomItem.name),
      })
    );
  }

  navigateToCinemas() {
    this.router.navigate(['/cinemas']);
  }
}
