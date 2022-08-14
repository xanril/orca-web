import { createFeature, createReducer, on } from '@ngrx/store';
import * as SchedulesPageActions from './schedules-page.actions';

export const schedulesPageFeatureKey = 'schedulesPage';

export interface State {
  activeCinemaId: number | null;
  activeRoomId: number | null;
  activeDayIndex: number;
}

const initialState: State = {
  activeCinemaId: null,
  activeRoomId: null,
  activeDayIndex: 0,
};

export const schedulesPageFeature = createFeature({
  name: schedulesPageFeatureKey,
  reducer: createReducer(
    initialState,
    on(SchedulesPageActions.setActiveCinemaId, (state, action) => {
      return {
        ...state,
        activeCinemaId: action.id,
      };
    }),
    on(SchedulesPageActions.setActiveRoomId, (state, action) => {
      return {
        ...state,
        activeRoomId: action.id,
      };
    }),
    on(SchedulesPageActions.resetActiveRoomId, (state, action) => {
      return {
        ...state,
        activeRoomId: null,
      };
    }),
    on(SchedulesPageActions.setActiveDayIndex, (state, action) => {
      return {
        ...state,
        activeDayIndex: action.dayIndex,
      };
    })
  ),
});
