import { createSelector } from '@ngrx/store';
import { cinemasFeature } from './cinemas.reducer';

export const selectCinemaWithId = (cinemaId: number) => {
  return createSelector(cinemasFeature.selectCinemas, (cinemas) => {
    const filteredItems = cinemas.filter((item) => item.id === cinemaId);
    return filteredItems[0];
  });
};

export const selectCinemaRoomWithId = (cinemaRoomId: number) => {
  return createSelector(cinemasFeature.selectCinemaRooms, (cinemaRooms) => {
    const filteredItems = cinemaRooms.filter(
      (item) => item.id === cinemaRoomId
    );
    return filteredItems[0];
  });
};

export const selectCinemaRoomsWithCinemaId = (cinemaId: number) => {
  return createSelector(cinemasFeature.selectCinemaRooms, (cinemaRooms) => {
    return cinemaRooms.filter((item) => {
      return item.cinemaId === cinemaId;
    });
  });
};

export const selectSchedulesWithCinemaRoomId = (roomId: number) => {
  return createSelector(cinemasFeature.selectSchedules, (schedules) => {
    return schedules.filter((item) => {
      return item.cinemaRoomId === roomId;
    });
  });
};

export const {
  selectCinemas,
  selectCinemaRooms,
  selectSchedules
} = cinemasFeature;