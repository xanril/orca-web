import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as RoomsActions from '../../../store/rooms/rooms.actions';

@Component({
  selector: 'app-add-room-item',
  templateUrl: './add-room-item.component.html',
  styleUrls: ['./add-room-item.component.css'],
})
export class AddRoomItemComponent implements OnInit {
  @Input() cinemaId: number | undefined;
  isFormShown: boolean = false;
  roomForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {}

  showFormHandler() {
    this.isFormShown = true;
    this.roomForm.reset();
  }

  cancelHandler() {
    this.isFormShown = false;
  }

  submitHandler() {
    this.store.dispatch(
      RoomsActions.addRoom({
        room: {
          id: -1,
          cinemaId: Number(this.cinemaId),
          name: this.roomForm.get('name')?.value ?? ' New Room',
        },
      })
    );
    this.isFormShown = false;
  }
}
