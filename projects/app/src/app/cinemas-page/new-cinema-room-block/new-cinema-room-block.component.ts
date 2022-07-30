import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-cinema-room-block',
  templateUrl: './new-cinema-room-block.component.html',
  styleUrls: ['./new-cinema-room-block.component.css'],
})
export class NewCinemaRoomBlockComponent implements OnInit {
  targetForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  isFormShown: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  showFormHandler(event: Event) {
    if (this.isFormShown) {
      return;
    }

    this.isFormShown = true;
  }

  cancelHandler() {
    this.isFormShown = false;
  }

  submitHandler() {
    if (!this.targetForm.valid) {
      return;
    }
    
    const cinemaRoomName: string = this.targetForm.controls['name'].value;
    // const cinemaLocation: string = (data['location'] as string) ?? '';

    // this.store.dispatch(
    //   CinemaActions.addCinema({
    //     name: cinemaName,
    //     location: cinemaLocation,
    //     roomNames: []
    //   })
    // );
  }
}
