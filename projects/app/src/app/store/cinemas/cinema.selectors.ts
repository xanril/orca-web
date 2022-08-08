import { createSelector } from '@ngrx/store';
import { cinemasAdapter, cinemasFeature } from './cinemas.reducer';

const { selectTotal, selectAll } = cinemasAdapter.getSelectors();

export const selectAllCinemas = createSelector(
  cinemasFeature.selectCinemasState,
  (state) => {
    return selectAll(state);
  }
);

export const selectTotalCinemasCount = createSelector(
  cinemasFeature.selectCinemasState,
  (state) => {
    return selectTotal(state);
  }
);

export const selectCinemaWithId = (cinemaId: number) => {
  return createSelector(cinemasFeature.selectEntities, (cinemaEntities) => {
    return cinemaEntities[cinemaId];
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

export const { selectCinemaRooms, selectSchedules } = cinemasFeature;
