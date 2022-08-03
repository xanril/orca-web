import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CinemaRoom } from '../../models/cinema-room.model';
import { Cinema } from '../../models/cinema.model';
import * as CinemaActions from '../../store/cinemas/cinema.actions';
import * as CinemaSelectors from '../../store/cinemas/cinema.selectors';

@Component({
  selector: 'app-new-cinema-room-block',
  templateUrl: './new-cinema-room-block.component.html',
  styleUrls: ['./new-cinema-room-block.component.css'],
})
export class NewCinemaRoomBlockComponent implements OnInit, OnDestroy {
  @Input() cinema!: Cinema;
  isFormShown: boolean = false;
  cinemaRooms: CinemaRoom[] = [];
  subscriptionBag: Subscription = new Subscription();
  targetForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store, private actions$: Actions) {}

  ngOnInit(): void {
    this.subscriptionBag.add(
      this.actions$
        .pipe(ofType(CinemaActions.addCinemaRoomSuccess))
        .subscribe(() => {
          this.isFormShown = false;
          this.targetForm.reset();
        })
    );

    this.subscriptionBag.add(
      this.store
        .pipe(CinemaSelectors.selectVisibleRooms(this.cinema.id))
        .subscribe((data) => {
          this.cinemaRooms = data;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptionBag.unsubscribe();
  }

  showFormHandler(event: Event) {
    if (this.isFormShown) {
      return;
    }

    this.isFormShown = true;
  }

  cancelHandler() {
    this.isFormShown = false;
  }

  submitHandler() {
    if (!this.targetForm.valid) {
      return;
    }

    const cinemaRoomName: string = this.targetForm.controls['name'].value;

    const isExistingName = this.cinemaRooms.find(
      (m) => m.name === cinemaRoomName
    );

    if (isExistingName) {
      console.log('room name already exists');
      return;
    }

    this.store.dispatch(
      CinemaActions.addCinemaRoom({
        cinemaId: this.cinema.id,
        roomName: cinemaRoomName,
      })
    );
  }
}
