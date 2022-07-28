import { createReducer, on } from '@ngrx/store';
import { Cinema } from '../../models/cinema.model';
import * as CinemaActions from './cinema.actions';

export const cinemaFeatureKey = 'cinema';

export interface State {
  cinemas: Cinema[]
}

export const initialState: State = {
  cinemas: []
};

export const reducer = createReducer(
  initialState,
  on(CinemaActions.addCinemaSuccess, (state, action) => {
    return {
      ...state,
      cinemas: [...state.cinemas, action.cinema]
    }
  })
);
