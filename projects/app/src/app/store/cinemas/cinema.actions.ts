import { createAction, props } from '@ngrx/store';
import { CinemaRoom } from '../../models/cinema-room.model';
import { Cinema } from '../../models/cinema.model';
import { CinemaRoomSchedule } from '../../models/cinema-room-schedule.model';

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
  props<{ name: string; location: string; roomNames: string[] }>()
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
  props<{ id: number; name: string; location: string }>()
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
  props<{ cinemaId: number; cinemaRoom: CinemaRoom }>()
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
  props<{ newSchedule: CinemaRoomSchedule }>()
);

export const addCinemaRoomScheduleFailure = createAction(
  '[Cinema] Add Cinema Room Schedule Failure',
  props<{ error: any }>()
);
