import { Movie } from "./movie.model";
import { CinemaRoom } from "./cinema-room.model";

export interface Cinema {
    id: number;
    name: string;
    location: string;
    movies: Movie[];
    cinemaRooms: CinemaRoom[];
  }