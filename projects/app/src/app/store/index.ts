import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromManageMovie from '../manage-movie/store/manage-movie.reducer';

export interface AppState {
  manageMovie: fromManageMovie.State
}

export const reducers: ActionReducerMap<AppState> = {
  manageMovie: fromManageMovie.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
