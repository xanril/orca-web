import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as moviesFeature from './movies/movies.reducer';
import * as cinemasFeature from './cinemas/cinemas.reducer';

export interface AppState {
  moviesData: moviesFeature.State;
  cinemasData: cinemasFeature.State;
}

export const reducers: ActionReducerMap<AppState> = {
  moviesData: moviesFeature.reducer,
  cinemasData: cinemasFeature.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
