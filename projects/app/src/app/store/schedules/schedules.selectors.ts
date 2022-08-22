import { createSelector } from '@ngrx/store';
import { schedulesAdapter, schedulesFeature } from './schedules.reducer';

export const { selectAll, selectTotal } = schedulesAdapter.getSelectors();
export const { selectEntities, selectIds, selectSchedulesDataState } = schedulesFeature;

export const selectSchedulesWithCinemaIdAndRoomId = (roomId: number) =>
  createSelector(schedulesFeature.selectSchedulesDataState, (state) => {
    const schedules = selectAll(state);
    return schedules.filter((item) => item.roomId == roomId);
  });

export const selectTotalCount = createSelector(
  schedulesFeature.selectSchedulesDataState,
  (state) => {
    return selectTotal(state);
  }
);
