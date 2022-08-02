import { Component, Input, OnInit } from '@angular/core';
import { CinemaRoom } from '../../models/cinema-room.model';

@Component({
  selector: 'app-cinema-room-item',
  templateUrl: './cinema-room-item.component.html',
})
export class CinemaRoomItemComponent implements OnInit {
  @Input() cinemaRoomItem!: CinemaRoom;
  movieIdSet: Set<number> = new Set();
  earliestScheduleDate: Date = new Date(Date.now());
  lastScheduleDate: Date = new Date(Date.now());

  constructor() {}

  ngOnInit(): void {
    // count unique movies
    this.movieIdSet = new Set(
      this.cinemaRoomItem.schedule.map((item) => item.movieId)
    );

    // determine first and last scheduled dates
    if (this.cinemaRoomItem.schedule.length > 0) {
      this.earliestScheduleDate = this.cinemaRoomItem.schedule[0].startTime;
      this.lastScheduleDate =
        this.cinemaRoomItem.schedule[
          this.cinemaRoomItem.schedule.length - 1
        ].startTime;
    }
  }
}