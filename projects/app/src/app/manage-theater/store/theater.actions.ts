import { createAction, props } from '@ngrx/store';
import { Theater } from '../../models/theater.model';

export const addTheater = createAction(
  '[Theater] Add Theater',
  props<{ name: string, location: string, roomNames: string[] }>()
);

export const addTheaterSuccess = createAction(
  '[Theater] Add Theater Success',
  props<{ theater: Theater }>()
);

export const addTheaterFailure = createAction(
  '[Theater] Add Theater Failure',
  props<{ error: any }>()
);
