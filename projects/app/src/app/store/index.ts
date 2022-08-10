import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as moviesFeature from './movies/movies.reducer';
import * as cinemasFeature from './cinemas/cinemas.reducer';
import * as roomsFeature from './rooms/rooms.reducer';
import * as schedulesFeature from './schedules/schedules.reducer';

export interface AppState {
  moviesData: moviesFeature.State;
  cinemasData: cinemasFeature.State;
  roomsData: roomsFeature.State;
  schedulesData: schedulesFeature.State
}

export const reducers: ActionReducerMap<AppState> = {
  moviesData: moviesFeature.reducer,
  cinemasData: cinemasFeature.reducer,
  roomsData: roomsFeature.reducer,
  schedulesData: schedulesFeature.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
