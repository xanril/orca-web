import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Room } from '../../models/room.model';
import * as RoomsActions from './rooms.actions';

export const roomsFeatureKey = 'roomsData';

export const roomsAdapter = createEntityAdapter<Room>();

export interface State extends EntityState<Room> {}

export const roomsFeature = createFeature({
  name: roomsFeatureKey,
  reducer: createReducer(
    roomsAdapter.getInitialState(),
    on(RoomsActions.loadRoomsSuccess, (state, action) => {
      return roomsAdapter.addMany(action.rooms, state);
    }),
    on(RoomsActions.addRoomSuccess, (state, action) => {
      return roomsAdapter.addOne(action.room, state);
    }),
    on(RoomsActions.editRoomSuccess, (state, action) => {
      return roomsAdapter.upsertOne(action.room, state);
    }),
    on(RoomsActions.deleteRoomSuccess, (state, action) => {
      return roomsAdapter.removeOne(action.roomId + '', state);
    }),
  ),
});

export const { reducer } = roomsFeature;
