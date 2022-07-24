import { createReducer, on } from '@ngrx/store';
import { Theater } from '../../models/theater.model';
import * as TheaterActions from './theater.actions';

export const theaterFeatureKey = 'theater';

export interface State {
  theaters: Theater[]
}

export const initialState: State = {
  theaters: []
};

export const reducer = createReducer(
  initialState,
  on(TheaterActions.addTheaterSuccess, (state, action) => {
    return {
      ...state,
      theaters: [...state.theaters, action.theater]
    }
  })
);
