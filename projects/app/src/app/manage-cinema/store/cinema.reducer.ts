import { createReducer, createFeature, on } from '@ngrx/store';
import { Cinema } from '../../models/cinema.model';
import * as CinemaActions from './cinema.actions';

export const cinemaFeatureKey = 'cinema';

export interface State {
  cinemas: Cinema[];
}

const DUMMY_CINEMAS: Cinema[] = [
  {
    id: 0,
    name: 'Ayala Malls - Glorietta',
    location: 'Makati',
    movies: [],
    cinemaRooms: [
      {
        id: 0,
        name: 'Cinema 1',
        schedule: [],
      },
    ],
  },
  {
    id: 1,
    name: 'Ayala Malls - Greenbelt',
    location: 'Makati',
    movies: [],
    cinemaRooms: [
      {
        id: 0,
        name: 'Cinema 1',
        schedule: [],
      },
    ],
  },
  {
    id: 0,
    name: 'SM Aura',
    location: 'Taguig',
    movies: [],
    cinemaRooms: [
      {
        id: 0,
        name: 'Cinema 1',
        schedule: [],
      },
    ],
  }
];

export const initialState: State = {
  cinemas: DUMMY_CINEMAS,
};

// export const reducer = createReducer(
//   initialState,
//   on(CinemaActions.addCinemaSuccess, (state, action) => {
//     return {
//       ...state,
//       cinemas: [...state.cinemas, action.cinema],
//     };
//   })
// );

export const cinemasFeature = createFeature({
  name: 'cinemas',
  reducer: createReducer(
    initialState,
    on(CinemaActions.addCinemaSuccess, (state, action) => {
      return {
        ...state,
        cinemas: [...state.cinemas, action.cinema],
      };
    })
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectCinemasState, // feature selector
  selectCinemas, // selector for `cinemas` property
} = cinemasFeature;