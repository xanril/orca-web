import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromManageMovie from '../manage-movie/store/manage-movie.reducer';
import * as fromManageCinema from '../manage-cinema/store/cinema.reducer';

export interface AppState {
  movies: fromManageMovie.State;
  cinemas: fromManageCinema.State;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: fromManageMovie.reducer,
  cinemas: fromManageCinema.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
