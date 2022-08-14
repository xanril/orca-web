import { createAction, props } from '@ngrx/store';
import { Schedule } from '../../models/schedule.model';

export const loadSchedules = createAction('[Schedules API] Load Schedules');

export const loadSchedulesSuccess = createAction(
  '[Schedules API] Load Schedules Success',
  props<{ schedules: Schedule[] }>()
);

export const loadSchedulesFailure = createAction(
  '[Schedules API] Load Schedules Failure',
  props<{ error: any }>()
);

export const deleteSchedule = createAction(
  '[Schedules API] Delete Schedule',
  props<{ id: number }>()
);

export const deleteScheduleSuccess = createAction(
  '[Schedules API] Delete Schedule Success',
  props<{ id: number }>()
);

export const deleteScheduleFailure = createAction(
  '[Schedules API] Delete Schedule Failure',
  props<{ error: any }>()
);

export const updateSchedule = createAction(
  '[Schedules API] Update Schedule',
  props<{ schedule: Schedule }>()
);

export const updateScheduleSuccess = createAction(
  '[Schedules API] Update Schedule Success',
  props<{ schedule: Schedule }>()
);

export const updateScheduleFailure = createAction(
  '[Schedules API] Update Schedule Failure',
  props<{ error: any }>()
);

export const addSchedule = createAction(
  '[Schedules API] Add Schedule',
  props<{ schedule: Schedule }>()
);

export const addScheduleSuccess = createAction(
  '[Schedules API] Add Schedule Success',
  props<{ schedule: Schedule }>()
);

export const addScheduleFailure = createAction(
  '[Schedules API] Add Schedule Failure',
  props<{ error: any }>()
);