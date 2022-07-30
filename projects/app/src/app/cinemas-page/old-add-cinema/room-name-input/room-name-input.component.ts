import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-room-name-input',
  templateUrl: './room-name-input.component.html',
  styleUrls: ['./room-name-input.component.css'],
})
export class RoomNameInputComponent implements OnInit {
  @ViewChild('roomInput') roomInputRef!: ElementRef;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() isRequired: boolean = true;
  @Output() onSubmitName: EventEmitter<{
    key: string;
    name: string;
  }> = new EventEmitter<{ key: string; name: string }>();

  constructor() {}

  ngOnInit(): void {}

  inputValueChangeHandler(event: Event) {
    if (!this.isRequired) {
      return;
    }

    this.roomInputRef.nativeElement.setCustomValidity(
      'Please finalize this room name'
    );
  }

  addHandler() {
    if (this.roomInputRef.nativeElement.value.trim() === '') {
      return;
    }

    this.onSubmitName.emit({
      key: this.id,
      name: this.roomInputRef.nativeElement.value,
    });

    this.roomInputRef.nativeElement.value = '';
    this.roomInputRef.nativeElement.setCustomValidity('');
  }
}
