import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css'],
})
export class AddNewItemComponent implements OnInit {
  @Input() addLabel: string = 'Add New Item';
  @Input() placeholder: string = 'Item Name';
  @Output() onSubmit = new EventEmitter<string>();
  isFormShown: boolean = false;
  nameForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  showFormHandler() {
    this.isFormShown = true;
    this.nameForm.reset();
  }

  cancelHandler() {
    this.isFormShown = false;
  }

  submitHandler() {
    this.onSubmit.emit(this.nameForm.get('name')?.value);
    this.isFormShown = false;
  }
}
