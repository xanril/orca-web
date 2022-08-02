import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CinemaRoomSchedule } from '../../models/cinema-room-schedule.model';
import { CinemaRoom } from '../../models/cinema-room.model';
import { cinemasFeature } from '../store/cinema.reducer';
import * as CinemaSelectors from '../store/cinema.selectors';

@Component({
  selector: 'app-edit-cinema-room',
  templateUrl: './edit-cinema-room.component.html',
})
export class EditCinemaRoomComponent implements OnInit, OnDestroy {
  cinemaRoom: CinemaRoom | null = null;
  roomSchedules: CinemaRoomSchedule[] = [];
  getRoomSubscription?: Subscription;
  editCinemaRoomForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getRoomSubscription = this.store
      .select(cinemasFeature.selectActiveRoom)
      .subscribe((room) => {
        this.cinemaRoom = room 
        
      });

    // const paramQuery = this.route.snapshot.params['id'];

    this.store
      .pipe(CinemaSelectors.selectSchedulesForRoom(this.cinemaRoom!.id))
      .subscribe((schedules) => {
        this.roomSchedules = schedules;
      });
  }

  ngOnDestroy(): void {
    this.getRoomSubscription?.unsubscribe();
  }
}
