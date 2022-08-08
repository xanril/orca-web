import { createSelector } from '@ngrx/store';
import { roomsAdapter, roomsFeature } from './rooms.reducer';

const { selectAll } = roomsAdapter.getSelectors();

export const selectAllRooms = createSelector(
  roomsFeature.selectRoomsDataState,
  (state) => {
    return selectAll(state);
  }
);

export const selectRoomsWithCinemaId = (cinemaId: number) =>
  createSelector(selectAllRooms, (rooms) => {
    return rooms.filter((room) => room.cinemaId === cinemaId);
  });
