import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CinemaRoomSchedule } from '../../models/cinema-room-schedule.model';
import { Room } from '../../models/room.model';
import * as CinemaSelectors from '../../store/cinemas/cinema.selectors';

@Component({
  selector: 'app-edit-cinema-room',
  templateUrl: './edit-cinema-room.component.html',
})
export class EditCinemaRoomComponent implements OnInit, OnDestroy {
  cinemaRoom: Room | null = null;
  roomSchedules: CinemaRoomSchedule[] = [];
  subscriptionBag: Subscription = new Subscription();
  editCinemaRoomForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const cinemaRoomId = +this.route.snapshot.params['id'];

    // this.subscriptionBag.add(this.store
    //   .select(CinemaSelectors.selectCinemaRoomWithId(cinemaRoomId))
    //   .subscribe((room) => {
    //     this.cinemaRoom = room;
    //   }));

    // this.subscriptionBag.add(this.store
    //   .select(CinemaSelectors.selectSchedulesWithCinemaRoomId(this.cinemaRoom!.id))
    //   .subscribe((schedules) => {
    //     this.roomSchedules = schedules;
    //   }));
  }

  ngOnDestroy(): void {
    this.subscriptionBag.unsubscribe();
  }
}
