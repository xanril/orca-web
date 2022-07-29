import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

export enum NewRoomInputStatus {
  NEW = 'new',
  ADDED = 'added',
  EDIT_START = 'editStart',
  EDIT_END = 'editEnd',
  EDIT_CANCELLED = 'editCancelled',
  REMOVED = 'removed',
}

@Component({
  selector: 'app-new-room-input',
  templateUrl: './new-room-input.component.html',
  styleUrls: ['./new-room-input.component.css'],
})
export class NewRoomInputComponent implements OnInit {
  @ViewChild('roomInput') roomInputRef!: ElementRef;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() initialValue: string = '';
  @Input() initialStatus: string = NewRoomInputStatus.NEW;
  @Input() willReturnToNewStatus: boolean = false;
  @Input() isRequired: boolean = true;
  @Output() onStatusChanged: EventEmitter<{
    key: string;
    name: string;
    status: string;
  }> = new EventEmitter<{ key: string; name: string; status: string }>();
  isInputShown: boolean = true;
  enteredText: string = '';
  status: NewRoomInputStatus = NewRoomInputStatus.NEW;

  constructor() {}

  ngOnInit(): void {
    this.setStatus(this.initialStatus as NewRoomInputStatus);
    this.enteredText = this.initialValue;
  }

  inputValueChangeHandler(event: Event) {
    this.updateValidation();
  }

  updateValidation() {
    if (!this.roomInputRef) {
      // do not proceed if ref is null
      return;
    }

    if (
      !this.isRequired &&
      (this.status === NewRoomInputStatus.NEW ||
        this.status === NewRoomInputStatus.EDIT_START)
    ) {
      this.roomInputRef.nativeElement.setCustomValidity(
        'Please finalize this room name'
      );

      return;
    }

    this.roomInputRef.nativeElement.setCustomValidity('');
  }

  addHandler() {
    this.setStatus(NewRoomInputStatus.ADDED);
    this.onStatusChanged.emit({
      key: this.id,
      name: this.enteredText,
      status: this.status,
    });

    if (this.willReturnToNewStatus) {
      this.setStatus(NewRoomInputStatus.NEW);
    }

    this.updateValidation();
  }

  editStartHandler() {
    this.setStatus(NewRoomInputStatus.EDIT_START);
    this.updateValidation();
    this.onStatusChanged.emit({
      key: this.id,
      name: this.enteredText,
      status: this.status,
    });
  }

  editCancelHandler() {
    this.setStatus(NewRoomInputStatus.EDIT_CANCELLED);
    this.updateValidation();
    this.onStatusChanged.emit({
      key: this.id,
      name: this.enteredText,
      status: this.status,
    });
  }

  editCompleteHandler() {
    this.setStatus(NewRoomInputStatus.EDIT_END);
    this.updateValidation();
    this.onStatusChanged.emit({
      key: this.id,
      name: this.enteredText,
      status: this.status,
    });
  }

  removeHandler() {
    this.setStatus(NewRoomInputStatus.REMOVED);
    this.onStatusChanged.emit({
      key: this.id,
      name: this.enteredText,
      status: this.status,
    });
  }

  setStatus(newStatus: NewRoomInputStatus) {
    switch (newStatus) {
      case NewRoomInputStatus.NEW:
        this.isInputShown = true;
        this.enteredText = '';
        if (this.roomInputRef) {
          this.roomInputRef.nativeElement.value = '';
        }
        break;

      case NewRoomInputStatus.ADDED:
        this.isInputShown = false;
        this.enteredText = this.roomInputRef?.nativeElement.value ?? '';
        break;

      case NewRoomInputStatus.EDIT_START:
        this.isInputShown = true;
        break;

      case NewRoomInputStatus.EDIT_END:
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
          this.enteredText = this.roomInputRef?.nativeElement.value ?? '';
        }

        break;

      case NewRoomInputStatus.EDIT_CANCELLED:
        this.isInputShown = false;
        this.roomInputRef.nativeElement.value = this.enteredText;
        break;
    }
    this.status = newStatus;
  }
}
