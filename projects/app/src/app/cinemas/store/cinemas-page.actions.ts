import { createAction, props } from '@ngrx/store';

export const setActiveCinema = createAction(
  '[Cinemas Page] Set Active Cinema',
  props<{ cinemaId: number }>()
);

export const resetActiveCinemaId = createAction(
  '[Cinemas Page] Reset Active Cinema'
);
