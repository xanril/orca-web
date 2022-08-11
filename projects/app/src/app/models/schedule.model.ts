export interface Schedule {
  id: number;
  cinemaId: number;
  roomId: number;
  movieId: number;
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
  ticketPrice: number;
}
