import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Room } from '../../../models/room.model';
import * as RoomsActions from '../../../store/rooms/rooms.actions';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
})
export class CinemaRoomItemComponent implements OnInit {
  @Input() room!: Room;
  isEditing: boolean = false;
  roomForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {}

  editHandler() {
    this.isEditing = true;
    this.roomForm.get('name')?.setValue(this.room.name);
  }

  deleteHandler() {
    this.store.dispatch(RoomsActions.deleteRoom({
      roomId: this.room.id
    }));
  }

  submitHandler() {
    this.store.dispatch(
      RoomsActions.editRoom({
        room: {
          ...this.room,
          name: this.roomForm.get('name')?.value ?? this.room.name,
        },
      })
    );
    this.isEditing = false;
  }

  cancelEditingHandler() {
    this.isEditing = false;
  }
}
