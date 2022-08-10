import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { Schedule } from "../models/schedule.model";

const DUMMY_CINEMA_ROOM_SCHEDULES: Schedule[] = [
  {
    id: 0,
    cinemaId: 0,
    cinemaRoomId: 0,
    movieId: 0,
    dayOfWeek: 0,
    startTime: new Date(2022, 9, 17, 11, 15, 0),
    endTime: new Date(2022, 9, 17, 14, 15, 0),
    ticketPrice: 200,
  },
  {
    id: 1,
    cinemaId: 1,
    cinemaRoomId: 0,
    movieId: 0,
    dayOfWeek: 0,
    startTime: new Date(2022, 9, 17, 14, 30, 0),
    endTime: new Date(2022, 9, 17, 16, 30, 0),
    ticketPrice: 200,
  },
  {
    id: 2,
    cinemaId: 0,
    cinemaRoomId: 0,
    movieId: 2,
    dayOfWeek: 0,
    startTime: new Date(2022, 9, 17, 16, 45, 0),
    endTime: new Date(2022, 9, 17, 18, 45, 0),
    ticketPrice: 200,
  },
];

@Injectable({ providedIn: 'root' })
export class SchedulesService {
  constructor() {}

  getSchedules() {
    return of(DUMMY_CINEMA_ROOM_SCHEDULES);
  }

  addSchedule(schedule: Schedule ) {
    return of(schedule);
  }

  deleteSchedule(id: number) {
    return of(id);
  }

  updateSchedule(updatedSchedule: Schedule) {
    return of(updatedSchedule);
  }
}