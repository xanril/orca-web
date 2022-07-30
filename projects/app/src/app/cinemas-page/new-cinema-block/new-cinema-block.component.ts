import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('container') containerRef!: ElementRef;
  @ViewChild('targetForm') targetFormRef!: ElementRef;
  addSuccessSubscription?: Subscription;
  isFormShown: boolean = false;
  
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

  @HostListener('submit', ['$event'])
  submitHandler(event: Event) {
    event.preventDefault();

    if (this.targetFormRef.nativeElement !== event.target) {
      return;
    }

    // const data = serialize(this.targetFormRef.nativeElement);
    const data = { name: '', location: '' }
    const cinemaName: string = (data['name'] as string) ?? '';
    const cinemaLocation: string = (data['location'] as string) ?? '';

    this.store.dispatch(
      CinemaActions.addCinema({
        name: cinemaName,
        location: cinemaLocation,
        roomNames: []
      })
    );
  }

  cancelHandler() {
    this.isFormShown = false;
  }
}