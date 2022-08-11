import { createSelector } from '@ngrx/store';
import { roomsAdapter, roomsFeature } from './rooms.reducer';

const { selectAll, selectTotal } = roomsAdapter.getSelectors();

export const selectAllRooms = createSelector(
  roomsFeature.selectRoomsDataState,
  (state) => {
    return selectAll(state);
  }
);

export const selectTotalCount = createSelector(
  roomsFeature.selectRoomsDataState,
  (state) => {
    return selectTotal(state);
  }
);

export const selectRoomsWithCinemaId = (cinemaId: number) =>
  createSelector(selectAllRooms, (rooms) => {
    return rooms.filter((room) => room.cinemaId == cinemaId);
  });
