import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, createFeature, on } from '@ngrx/store';
import { Cinema } from '../../models/cinema.model';
import * as CinemaActions from './cinema.actions';

export const cinemaFeatureKey = 'cinemasData';

export const cinemasAdapter: EntityAdapter<Cinema> =
  createEntityAdapter<Cinema>();

export interface State extends EntityState<Cinema> {
}

export const cinemasFeature = createFeature({
  name: cinemaFeatureKey,
  reducer: createReducer(
    cinemasAdapter.getInitialState(),
    on(CinemaActions.loadCinemasSuccess, (state, action) => {
      return cinemasAdapter.addMany(action.cinemas, state);
    }),
    on(CinemaActions.deleteCinemaSuccess, (state, action) => {
      return cinemasAdapter.removeOne(action.cinemaId, state);
    }),
    on(CinemaActions.addCinemaSuccess, (state, action) => {
      return cinemasAdapter.addOne(action.cinema, state);
    }),
    on(CinemaActions.editCinemaSuccess, (state, action) => {
      return cinemasAdapter.upsertOne(action.cinema, state);
    }),
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
} = cinemasFeature;
