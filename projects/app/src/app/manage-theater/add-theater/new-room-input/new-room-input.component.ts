import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
export class NewRoomInputComponent implements OnInit, OnChanges {
  @ViewChild('roomInput') roomInputRef!: ElementRef;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() initialValue: string = '';
  @Input() initialStatus: string = NewRoomInputStatus.NEW;
  @Input() willReturnToNewStatus: boolean = false;
  @Input() useCustomValidity: boolean = true;
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
    console.log('onInit');
    this.setStatus(this.initialStatus as NewRoomInputStatus);
    this.enteredText = this.initialValue;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['useCustomValidity'] &&
      changes['useCustomValidity']!.currentValue === false
    ) {
      this.roomInputRef.nativeElement.setCustomValidity('');
    }
  }

  @HostListener('sl-input', ['$event'])
  onInputValueChange(event: Event) {
    if (
      this.useCustomValidity === false ||
      event.target !== this.roomInputRef.nativeElement
    ) {
      this.roomInputRef.nativeElement.setCustomValidity('');
      return;
    }

    this.updateValidation();
  }

  updateValidation() {
    if (
      this.status === NewRoomInputStatus.NEW ||
      this.status === NewRoomInputStatus.EDIT_START
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
  }

  editStartHandler() {
    this.setStatus(NewRoomInputStatus.EDIT_START);
    this.onStatusChanged.emit({
      key: this.id,
      name: this.enteredText,
      status: this.status,
    });
  }

  editCancelHandler() {
    this.setStatus(NewRoomInputStatus.EDIT_CANCELLED);
    this.onStatusChanged.emit({
      key: this.id,
      name: this.enteredText,
      status: this.status,
    });
  }

  editCompleteHandler() {
    this.setStatus(NewRoomInputStatus.EDIT_END);
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
        this.updateValidation();
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
