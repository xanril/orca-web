import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Room } from "../models/room.model";

const DUMMY_CINEMA_ROOMS: Room[] = [
    {
      id: 0,
      cinemaId: 0,
      name: 'Cinema 1',
    },
    {
      id: 1,
      cinemaId: 0,
      name: 'Cinema 2',
    },
    {
      id: 2,
      cinemaId: 1,
      name: 'Cinema 1',
    },
    {
      id: 3,
      cinemaId: 2,
      name: 'Cinema 1',
    },
  ];

@Injectable({ providedIn: 'root' })
export class RoomsService {
  constructor() {}

  getRooms() {
    return of(DUMMY_CINEMA_ROOMS);
  }

  addCinema(room: Room) {
    return of(room);
  }

  deleteCinema(id: number) {
    return of(id);
  }

  updateCinema(updatedRoom: Room) {
    return of(updatedRoom);
  }
}