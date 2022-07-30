import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { serialize } from '@shoelace-style/shoelace/dist/utilities/form';

@Component({
  selector: 'app-new-cinema-room-block',
  templateUrl: './new-cinema-room-block.component.html',
  styleUrls: ['./new-cinema-room-block.component.css']
})
export class NewCinemaRoomBlockComponent implements OnInit {
  @ViewChild('targetForm') targetFormRef!:ElementRef;
  isFormShown: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showFormHandler(event: Event) {
    if (this.isFormShown) {
      return;
    }

    this.isFormShown = true;
  }

  cancelHandler() {
    this.isFormShown = false;
  }

  @HostListener('submit', ['$event'])
  submitHandler(event: Event) {
    event.preventDefault();

    if (this.targetFormRef.nativeElement !== event.target) {
      return;
    }

    const data = serialize(this.targetFormRef.nativeElement);
    const cinemaRoomName: string = (data['name'] as string) ?? '';
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
