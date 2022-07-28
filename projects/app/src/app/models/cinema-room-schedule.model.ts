import { CinemaRoomSeat } from "./cinema-room-seat.model";

export interface CinemaRoomSchedule {
  id: number;
  cinemaRoomId: number;
  movieId: number;
  seat: CinemaRoomSeat[];
  startTime: Date;
  endTime: Date;
}
