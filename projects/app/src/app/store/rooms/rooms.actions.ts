import { createAction, props } from '@ngrx/store';
import { Room } from '../../models/room.model';

export const loadRooms = createAction('[Rooms API] Load Rooms');

export const loadRoomsSuccess = createAction(
  '[Rooms API] Load Rooms Success',
  props<{ rooms: Room[] }>()
);

export const loadRoomsFailure = createAction(
  '[Rooms API] Load Rooms Failure',
  props<{ error: any }>()
);
