import { createFeature, createReducer, on } from '@ngrx/store';
import * as CinemasPageActions from './cinemas-page.actions';

export interface State {
  activeCinemaId: number;
}

const initialState: State = {
  activeCinemaId: -1,
};

export const cinemasPageFeature = createFeature({
  name: 'cinemasPage',
  reducer: createReducer(
    initialState,
    on(CinemasPageActions.setActiveCinema, (state, action) => {
      return { ...state, activeCinemaId: action.cinemaId };
    })
  ),
});
