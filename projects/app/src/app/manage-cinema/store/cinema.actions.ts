import { createAction, props } from '@ngrx/store';
import { Cinema } from '../../models/cinema.model';

export const addCinema = createAction(
  '[Cinema] Add Cinema',
  props<{ name: string, location: string, roomNames: string[] }>()
);

export const addCinemaSuccess = createAction(
  '[Cinema] Add Cinema Success',
  props<{ cinema: Cinema }>()
);

export const addCinemaFailure = createAction(
  '[Cinema] Add Cinema Failure',
  props<{ error: any }>()
);
