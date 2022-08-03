import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as moviesFeature from './movies/movies.reducer';
import * as cinemasFeature from './cinemas/cinemas.reducer';

export interface AppState {
  movies: moviesFeature.State;
  cinemas: cinemasFeature.State;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: moviesFeature.reducer,
  cinemas: cinemasFeature.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
