import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-submit-cancel-buttons',
  templateUrl: './submit-cancel-buttons.component.html',
  styles: [],
})
export class SubmitCancelButtonsComponent implements OnInit {
  @Output() onCancelClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  cancelHandler() {
    this.onCancelClick.emit();
  }
}
