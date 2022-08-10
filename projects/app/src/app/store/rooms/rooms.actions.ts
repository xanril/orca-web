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

export const addRoom = createAction(
  '[Rooms API] Add Room',
  props<{ room: Room }>()
);

export const addRoomSuccess = createAction(
  '[Rooms API] Add Room Success',
  props<{ room: Room }>()
);

export const addRoomFailure = createAction(
  '[Rooms API] Add Room Failure',
  props<{ error: any }>()
);

export const editRoom = createAction(
  '[Rooms API] Edit Room',
  props<{ room: Room }>()
);

export const editRoomSuccess = createAction(
  '[Rooms API] Edit Room Success',
  props<{ room: Room }>()
);

export const editRoomFailure = createAction(
  '[Rooms API] Edit Room Failure',
  props<{ error: any }>()
);

export const deleteRoom = createAction(
  '[Rooms API] Delete Room',
  props<{ roomId: number }>()
);

export const deleteRoomSuccess = createAction(
  '[Rooms API] Delete Room Success',
  props<{ roomId: number }>()
);

export const deleteRoomFailure = createAction(
  '[Rooms API] Delete Room Failure',
  props<{ error: any }>()
);
