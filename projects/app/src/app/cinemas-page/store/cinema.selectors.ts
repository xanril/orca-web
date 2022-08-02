import { createSelector, select } from '@ngrx/store';
import { map, pipe } from 'rxjs';
import { cinemasFeature } from './cinema.reducer';

export const selectVisibleRooms = createSelector(
  cinemasFeature.selectActiveCinema,
  cinemasFeature.selectCinemaRooms,
  (activeCinema, cinemaRooms) => {
    if (activeCinema) {
      return cinemaRooms.filter((room) => room.cinemaId === activeCinema!.id);
    }
    return [];
  }
);

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
