import { TheaterRoomSeat } from "./theater-room-seat.model";

export interface TheaterRoomSchedule {
  id: number;
  theaterRoomId: number;
  movieId: number;
  seat: TheaterRoomSeat[];
  startTime: Date;
  endTime: Date;
}
