import { createAction, props } from '@ngrx/store';
import { Room } from '../../models/room.model';
import { Cinema } from '../../models/cinema.model';
import { Schedule } from '../../models/schedule.model';

export const loadCinemas = createAction('[Cinema API] Load Cinemas');

export const loadCinemasSuccess = createAction(
  '[Cinema API] Load Cinemas Success',
  props<{ cinemas: Cinema[] }>()
);

export const loadCinemasFailure = createAction(
  '[Cinema API] Load Cinemas Failure',
  props<{ error: any }>()
);

export const addCinema = createAction(
  '[Cinema API] Add Cinema',
  props<{ cinema: Cinema }>()
);

export const addCinemaSuccess = createAction(
  '[Cinema API] Add Cinema Success',
  props<{ cinema: Cinema }>()
);

export const addCinemaFailure = createAction(
  '[Cinema API] Add Cinema Failure',
  props<{ error: any }>()
);

export const editCinema = createAction(
  '[Cinema API] Edit Cinema',
  props<{ cinema: Cinema }>()
);

export const editCinemaSuccess = createAction(
  '[Cinema API] Edit Cinema Success',
  props<{ cinema: Cinema }>()
);

export const editCinemaFailure = createAction(
  '[Cinema API] Edit Cinema Failure',
  props<{ error: any }>()
);

export const deleteCinema = createAction(
  '[Cinema API] Delete Cinema',
  props<{ cinemaId: number; }>()
);

export const deleteCinemaSuccess = createAction(
  '[Cinema API] Delete Cinema Success',
  props<{ cinemaId: number }>()
);

export const deleteCinemaFailure = createAction(
  '[Cinema API] Delete Cinema Failure',
  props<{ error: any }>()
);

export const addCinemaRoom = createAction(
  '[Cinema] Add Cinema Room',
  props<{ cinemaId: number; roomName: string }>()
);

export const addCinemaRoomSuccess = createAction(
  '[Cinema] Add Cinema Room Success',
  props<{ cinemaId: number; cinemaRoom: Room }>()
);

export const addCinemaRoomFailure = createAction(
  '[Cinema] Add Cinema Room Failure',
  props<{ error: any }>()
);

export const addCinemaRoomSchedule = createAction(
  '[Cinema] Add Cinema Room Schedule',
  props<{
    cinemaId: number;
    cinemaRoomId: number;
    movieId: number;
    dayOfWeek: number;
    startTime: Date;
    endTime: Date;
    ticketPrice: number;
  }>()
);

export const addCinemaRoomScheduleSuccess = createAction(
  '[Cinema] Add Cinema Room Schedule Success',
  props<{ newSchedule: Schedule }>()
);

export const addCinemaRoomScheduleFailure = createAction(
  '[Cinema] Add Cinema Room Schedule Failure',
  props<{ error: any }>()
);
