import { select } from '@ngrx/store';
import { map, pipe } from 'rxjs';
import { cinemasFeature } from './cinemas.reducer';

export const selectCinemaWithId = (cinemaId: number) => {
  return pipe(
    select(cinemasFeature.selectCinemas),
    map((cinemas) => {
      const filteredItems = cinemas.filter((item) => item.id === cinemaId);
      return filteredItems[0];
    })
  );
};

export const selectCinemaRoomWithId = (cinemaRoomId: number) => {
  return pipe(
    select(cinemasFeature.selectCinemaRooms),
    map((cinemaRooms) => {
      const filteredItems = cinemaRooms.filter(
        (item) => item.id === cinemaRoomId
      );
      return filteredItems[0];
    })
  );
};

export const selectVisibleRooms = (cinemaId: number) => {
  return pipe(
    select(cinemasFeature.selectCinemaRooms),
    map((cinemaRooms) => {
      return cinemaRooms.filter((item) => {
        return item.cinemaId === cinemaId;
      });
    })
  );
};

export const selectSchedulesForRoom = (roomId: number) => {
  return pipe(
    select(cinemasFeature.selectSchedules),
    map((schedules) => {
      return schedules.filter((item) => {
        return item.cinemaRoomId === roomId;
      });
    })
  );
};
