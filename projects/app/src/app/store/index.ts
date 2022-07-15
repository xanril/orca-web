import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromManageMovie from '../manage-movie/store/manage-movie.reducer';

export interface AppState {
  movies: fromManageMovie.State
}

export const reducers: ActionReducerMap<AppState> = {
  movies: fromManageMovie.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
