import { createSelector } from '@ngrx/store';
import { Cinema } from '../../models/cinema.model';
import { cinemasAdapter, cinemasFeature } from './cinemas.reducer';

const { selectTotal, selectAll, } = cinemasAdapter.getSelectors();

export const selectAllCinemas = createSelector(
  cinemasFeature.selectCinemasDataState,
  (state) => {
    return selectAll(state);
  }
);

export const selectTotalCinemasCount = createSelector(
  cinemasFeature.selectCinemasDataState,
  (state) => {
    return selectTotal(state);
  }
);

export const selectCinemaWithId = (cinemaId: number) => {
  return createSelector(cinemasFeature.selectEntities, (cinemaEntities) => {
    return cinemaEntities[cinemaId] as Cinema;
  });
};
