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
