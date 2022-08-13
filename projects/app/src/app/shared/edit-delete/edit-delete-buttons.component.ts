import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-delete-buttons',
  templateUrl: './edit-delete-buttons.component.html',
  styles: [
  ]
})
export class EditDeleteButtonsComponent implements OnInit {
  @Output() onEditClick = new EventEmitter<void>();
  @Output() onDeleteClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  editHandler() {
    this.onEditClick.emit();
  }

  deleteHandler() {
    this.onDeleteClick.emit();
  }
}
