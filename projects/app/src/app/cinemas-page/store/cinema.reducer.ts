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
      {
        id: 1,
        name: 'Cinema 2',
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
    id: 2,
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
  },
];

export const initialState: State = {
  cinemas: DUMMY_CINEMAS,
};

export const cinemasFeature = createFeature({
  name: 'cinemas',
  reducer: createReducer(
    initialState,
    on(CinemaActions.addCinemaSuccess, (state, action) => {
      return {
        ...state,
        cinemas: [...state.cinemas, action.cinema],
      };
    }),
    on(CinemaActions.editCinemaSuccess, (state, action) => {
      //get index
      let targetIndex = state.cinemas.findIndex(
        (m) => m.id === action.cinema.id
      );

      // assign new item
      const newCinemas = [...state.cinemas];
      newCinemas[targetIndex] = action.cinema;

      return {
        ...state,
        cinemas: [...newCinemas],
      };
    }),
    on(CinemaActions.addCinemaRoomSuccess, (state, action) => {
      const targetIndex = state.cinemas.findIndex(
        (m) => m.id === action.cinemaId
      );

      const newCinema: Cinema = {
        ...state.cinemas[targetIndex],
        cinemaRooms: [
          ...state.cinemas[targetIndex].cinemaRooms,
          action.cinemaRoom,
        ],
      };

      // assign updated cinema
      const newCinemas = [...state.cinemas];
      newCinemas[targetIndex] = newCinema;

      return {
        ...state,
        cinemas: [...newCinemas],
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
