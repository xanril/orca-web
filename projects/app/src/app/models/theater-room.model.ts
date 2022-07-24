import { TheaterRoomSchedule } from "./theater-room-schedule.model";

export interface TheaterRoom {
  id: number;
  name: string;
  schedule: TheaterRoomSchedule[];
}
