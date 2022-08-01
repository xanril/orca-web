import { createSelector } from '@ngrx/store';
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
