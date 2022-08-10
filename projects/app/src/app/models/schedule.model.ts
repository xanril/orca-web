export interface Schedule {
  id: number;
  cinemaId: number;
  cinemaRoomId: number;
  movieId: number;
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
  ticketPrice: number;
}
