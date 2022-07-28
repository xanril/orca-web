import { CinemaRoomSchedule } from "./cinema-room-schedule.model";

export interface CinemaRoom {
  id: number;
  name: string;
  schedule: CinemaRoomSchedule[];
}
