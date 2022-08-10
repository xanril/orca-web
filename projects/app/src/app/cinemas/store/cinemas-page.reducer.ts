import { createFeature, createReducer, on } from '@ngrx/store';
import * as CinemasPageActions from './cinemas-page.actions';

export interface State {
  activeCinemaId: number | null;
}

const initialState: State = {
  activeCinemaId: null,
};

export const cinemasPageFeature = createFeature({
  name: 'cinemasPage',
  reducer: createReducer(
    initialState,
    on(CinemasPageActions.setActiveCinema, (state, action) => {
      return { ...state, activeCinemaId: action.cinemaId };
    }),
    on(CinemasPageActions.resetActiveCinemaId, (state, action) => {
      return { ...state, activeCinemaId: null };
    })
  ),
});
