import { createAction, props } from '@ngrx/store';

export const setActiveCinemaId = createAction(
  '[Schedules Page] Set Active Cinema ID',
  props<{ id: number }>()
);

export const setActiveRoomId = createAction(
  '[Schedules Page] Set Active Room ID',
  props<{ id: number }>()
);

export const resetActiveRoomId = createAction(
  '[Schedules Page] Reset Active Room ID'
);

export const setActiveDayIndex = createAction(
  '[Schedules Page] Set Active Day Index',
  props<{ dayIndex: number }>()
)

export const setError = createAction(
  '[Schedules Page] Set Error',
  props<{ error: any }>()
)