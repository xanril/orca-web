import { Movie } from "./movie.model";
import { TheaterRoom } from "./theater-room.model";

export interface Theater {
    id: number;
    name: string;
    location: string;
    movies: Movie[];
    theaterRooms: TheaterRoom[];
  }