import { CinemaRoomSchedule } from "./cinema-room-schedule.model";

export interface CinemaRoom {
  id: number;
  cinemaId: number;
  name: string;
  schedule: CinemaRoomSchedule[];
}
