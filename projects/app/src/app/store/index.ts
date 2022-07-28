import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromManageMovie from '../manage-movie/store/manage-movie.reducer';
import * as cinemasFeature from '../manage-cinema/store/cinema.reducer';

export interface AppState {
  movies: fromManageMovie.State;
  cinemas: cinemasFeature.State;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: fromManageMovie.reducer,
  cinemas: cinemasFeature.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
