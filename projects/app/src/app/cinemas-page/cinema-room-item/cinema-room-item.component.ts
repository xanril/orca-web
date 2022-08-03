import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CinemaRoomSchedule } from '../../models/cinema-room-schedule.model';
import { CinemaRoom } from '../../models/cinema-room.model';
import * as CinemaActions from '../../store/cinemas/cinema.actions';
import * as CinemaSelectors from '../../store/cinemas/cinema.selectors';

@Component({
  selector: 'app-cinema-room-item',
  templateUrl: './cinema-room-item.component.html',
})
export class CinemaRoomItemComponent implements OnInit {
  @Input() cinemaRoomItem!: CinemaRoom;
  roomSchedules: CinemaRoomSchedule[] = [];
  movieIdSet: Set<number> = new Set();
  earliestScheduleDate: Date = new Date(Date.now());
  lastScheduleDate: Date = new Date(Date.now());

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store
      .pipe(
        CinemaSelectors.selectSchedulesForRoom(this.cinemaRoomItem.cinemaId)
      )
      .subscribe((schedules) => {
        this.roomSchedules = schedules;

        // count unique movies
        this.movieIdSet = new Set(
          this.roomSchedules.map((item) => item.movieId)
        );

        // determine first and last scheduled dates
        if (this.roomSchedules.length > 0) {
          this.earliestScheduleDate = this.roomSchedules[0].startTime;
          this.lastScheduleDate =
            this.roomSchedules[this.roomSchedules.length - 1].startTime;
        }
      });
  }

  manageHandler() {
    this.router.navigate(['/cinemas/room/', this.cinemaRoomItem.id + '']);
  }
}
