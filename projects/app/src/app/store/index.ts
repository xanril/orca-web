import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromManageMovie from '../manage-movie/store/manage-movie.reducer';
import * as fromManageTheater from '../manage-theater/store/theater.reducer';

export interface AppState {
  movies: fromManageMovie.State;
  theaters: fromManageTheater.State;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: fromManageMovie.reducer,
  theaters: fromManageTheater.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
