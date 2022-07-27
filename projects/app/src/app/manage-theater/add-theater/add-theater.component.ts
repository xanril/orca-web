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
import * as TheaterActions from '../store/theater.actions';
import { NewRoomInputStatus } from './new-room-input/new-room-input.component';

@Component({
  selector: 'app-add-theater',
  templateUrl: './add-theater.component.html',
  styleUrls: ['./add-theater.component.css'],
})
export class AddTheaterComponent implements OnInit, OnDestroy {
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
      .pipe(ofType(TheaterActions.addTheaterSuccess))
      .subscribe((data) => {
        this.navigateToTheater();
      });
  }

  ngOnDestroy(): void {
    this.successSubscription?.unsubscribe();
  }

  roomStatusChangedHandler(value: {
    key: string;
    name: string;
    status: string;
  }) {

    let roomIndex = this.roomInputNames.findIndex(
      (item) => item.key == value.key
    );

    switch(value.status) {
      case NewRoomInputStatus.ADDED:
        // add the room to the array.
        this.roomInputNames.push({ key: value.key, name: value.name });
      break;

      case NewRoomInputStatus.EDIT_END:
        // room name has been edited. update the array.
        this.roomInputNames[roomIndex].name = value.name;
        break;

      case NewRoomInputStatus.REMOVED:
        console.log("target index: " + roomIndex);
        // room has been removed. remove it from array as well.
        this.roomInputNames.splice(roomIndex, 1);
      break;
    }
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
        roomNames: this.roomInputNames.map((roomItem) =>
        roomItem.name)
      })
    );
  }

  navigateToTheater() {
    // this.router.navigate(['/theaters']);
  }
}
