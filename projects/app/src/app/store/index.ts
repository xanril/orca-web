import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as moviesFeature from './movies/movies.reducer';
import * as cinemasFeature from './cinemas/cinemas.reducer';
import * as roomsFeature from './rooms/rooms.reducer';

export interface AppState {
  moviesData: moviesFeature.State;
  cinemasData: cinemasFeature.State;
  roomsData: roomsFeature.State;
}

export const reducers: ActionReducerMap<AppState> = {
  moviesData: moviesFeature.reducer,
  cinemasData: cinemasFeature.reducer,
  roomsData: roomsFeature.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
