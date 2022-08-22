import { schedulesPageFeature } from './schedules-page.reducer';
import * as SchedulesSelectors from '../../store/schedules/schedules.selectors';
import { createSelector } from '@ngrx/store';

export const {
  selectActiveCinemaId,
  selectActiveRoomId,
  selectActiveDayIndex,
} = schedulesPageFeature;

export const selectSchedulesForActiveRoom = createSelector(
  SchedulesSelectors.selectSchedulesDataState,
  selectActiveRoomId,
  (state, roomId) => {
    const schedules = SchedulesSelectors.selectAll(state);
    return schedules.filter(
      (item) => item.roomId == roomId
    );
  }
);

export const selectSchedulesForActiveDay = createSelector(
  selectSchedulesForActiveRoom,
  selectActiveDayIndex,
  (schedules, dayIndex) => {
    return schedules.filter((item) => item.dayOfWeek == dayIndex);
  }
)
