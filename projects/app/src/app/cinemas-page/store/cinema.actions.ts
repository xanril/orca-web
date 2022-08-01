import { createAction, props } from '@ngrx/store';
import { CinemaRoom } from '../../models/cinema-room.model';
import { Cinema } from '../../models/cinema.model';

export const setActiveCinema = createAction(
  '[Cinema] Set Active Cinema',
  props<{ cinema: Cinema }>()
);

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

export const editCinema = createAction(
  '[Cinema] Edit Cinema',
  props<{ id: number, name: string, location: string }>()
);

export const editCinemaSuccess = createAction(
  '[Cinema] Edit Cinema Success',
  props<{ cinema: Cinema }>()
);

export const editCinemaFailure = createAction(
  '[Cinema] Edit Cinema Failure',
  props<{ error: any }>()
);

export const addCinemaRoom = createAction(
  '[Cinema] Add Cinema Room',
  props<{ cinemaId: number, roomName: string }>()
);

export const addCinemaRoomSuccess = createAction(
  '[Cinema] Add Cinema Room Success',
  props<{ cinemaId: number, cinemaRoom: CinemaRoom }>()
);

export const addCinemaRoomFailure = createAction(
  '[Cinema] Add Cinema Room Failure',
  props<{ error: any }>()
);