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

export const editRoom = createAction(
  '[Rooms API] Edit Room',
  props<{ room: Room }>()
);

export const editRoomSuccess = createAction(
  '[Rooms API] EditRoom Success',
  props<{ room: Room }>()
);

export const editRoomFailure = createAction(
  '[Rooms API] Edit Room Failure',
  props<{ error: any }>()
);
