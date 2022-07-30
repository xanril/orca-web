import { Component, Input, OnInit } from '@angular/core';
import { CinemaRoom } from '../../models/cinema-room.model';

@Component({
  selector: 'app-cinema-room-item',
  templateUrl: './cinema-room-item.component.html',
})
export class CinemaRoomItemComponent implements OnInit {
  @Input() cinemaRoomItem!: CinemaRoom
  
  constructor() { }

  ngOnInit(): void {
  }

}
