import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Cinema } from '../../models/cinema.model';
import * as CinemaActions from '../store/cinema.actions';

@Component({
  selector: 'app-new-cinema-room-block',
  templateUrl: './new-cinema-room-block.component.html',
  styleUrls: ['./new-cinema-room-block.component.css'],
})
export class NewCinemaRoomBlockComponent implements OnInit {
  @Input() cinema!: Cinema;
  targetForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  isFormShown: boolean = false;

  constructor(private store: Store, private actions$: Actions) {}

  ngOnInit(): void {
    this.actions$
      .pipe(ofType(CinemaActions.addCinemaRoomSuccess))
      .subscribe(() => {
        this.isFormShown = false;
        this.targetForm.reset();
      });
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

    const isExistingName = this.cinema.cinemaRooms.find(
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
