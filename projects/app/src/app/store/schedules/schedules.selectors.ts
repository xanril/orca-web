import { createSelector } from '@ngrx/store';
import { schedulesAdapter, schedulesFeature } from './schedules.reducer';

export const { selectAll } = schedulesAdapter.getSelectors();
export const { selectEntities, selectIds, selectSchedulesDataState } =
  schedulesFeature;

export const selectSchedulesWithCinemaIdAndRoomId = (
  cinemaId: number,
  roomId: number
) =>
  createSelector(schedulesFeature.selectSchedulesDataState, (state) => {
    const schedules = selectAll(state);
    return schedules.filter(
      (item) => item.cinemaId == cinemaId && item.roomId == roomId
    );
  });
