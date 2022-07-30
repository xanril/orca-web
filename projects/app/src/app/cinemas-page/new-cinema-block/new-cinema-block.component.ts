import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as CinemaActions from '../store/cinema.actions';

@Component({
  selector: 'app-new-cinema-block',
  templateUrl: './new-cinema-block.component.html',
  styleUrls: ['./new-cinema-block.component.css']
})
export class NewCinemaBlockComponent implements OnInit {
  @ViewChild('targetForm') targetFormRef!: ElementRef;
  addSuccessSubscription?: Subscription;
  isFormShown: boolean = false;
  targetForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required])
  });
  
  constructor(private store: Store, private actions$: Actions) { }

  ngOnInit(): void {
    this.addSuccessSubscription = this.actions$
      .pipe(ofType(CinemaActions.addCinemaSuccess))
      .subscribe((data) => {
        this.isFormShown = false;
      });
  }

  showFormHandler(event: Event) {
    if (this.isFormShown) {
      return;
    }

    this.isFormShown = true;
  }

  submitHandler() {

    if (!this.targetForm.valid) {
      return;
    }

    const cinemaName: string = this.targetForm.controls['name'].value;
    const cinemaLocation: string = this.targetForm.controls['location'].value;

    this.store.dispatch(
      CinemaActions.addCinema({
        name: cinemaName,
        location: cinemaLocation,
        roomNames: []
      })
    );

    this.targetForm.reset();
  }

  cancelHandler() {
    this.isFormShown = false;
  }
}