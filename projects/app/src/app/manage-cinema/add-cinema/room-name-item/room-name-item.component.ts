import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

export enum RoomItemStatus {
  ADDED = 'added',
  EDIT_START = 'editStart',
  EDIT_END = 'editEnd',
  EDIT_CANCELLED = 'editCancelled',
  REMOVED = 'removed',
}

@Component({
  selector: 'app-room-name-item',
  templateUrl: './room-name-item.component.html',
  styleUrls: ['./room-name-item.component.css'],
})
export class RoomNameItemComponent implements OnInit {
  @ViewChild('roomInput') roomInputRef!: ElementRef;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() initialValue: string = '';
  @Output() onEdit: EventEmitter<{
    key: string;
    name: string;
  }> = new EventEmitter<{ key: string; name: string }>();
  @Output() onRemove: EventEmitter<string> = new EventEmitter<string>();
  isInputShown: boolean = false;
  enteredText: string = '';
  status: RoomItemStatus = RoomItemStatus.ADDED;

  constructor() {}

  ngOnInit(): void {
    this.enteredText = this.initialValue;
  }

  editStartHandler() {
    this.setStatus(RoomItemStatus.EDIT_START);
    this.roomInputRef.nativeElement.setCustomValidity(
      'Please finalize this room name'
    );
  }

  editCancelHandler() {
    this.setStatus(RoomItemStatus.EDIT_CANCELLED);
    this.roomInputRef.nativeElement.setCustomValidity('');
  }

  editCompleteHandler() {
    this.setStatus(RoomItemStatus.EDIT_END);
    this.roomInputRef.nativeElement.setCustomValidity('');
    this.onEdit.emit({
      key: this.id,
      name: this.enteredText
    });
  }

  removeHandler() {
    this.setStatus(RoomItemStatus.REMOVED);
    this.onRemove.emit(this.id);
  }

  setStatus(newStatus: RoomItemStatus) {
    switch (newStatus) {
      case RoomItemStatus.EDIT_START:
        this.isInputShown = true;
        break;

      case RoomItemStatus.EDIT_END:
        this.isInputShown = false;
        let newEnteredText =
          this.roomInputRef!.nativeElement.value.trim() ?? '';
        if (
          newEnteredText === null ||
          newEnteredText === undefined ||
          newEnteredText === ''
        ) {
          // new value is an empty string
          // we reassign the previous value before edit started.
          this.roomInputRef!.nativeElement.value = this.enteredText;
        } else {
          // new value is valid.
          this.enteredText = this.roomInputRef!.nativeElement.value ?? '';
        }

        break;

      case RoomItemStatus.EDIT_CANCELLED:
        this.isInputShown = false;
        this.roomInputRef.nativeElement.value = this.enteredText;
        break;
    }
    this.status = newStatus;
  }
}
