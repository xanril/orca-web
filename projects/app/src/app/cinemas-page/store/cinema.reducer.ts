import { createReducer, createFeature, on } from '@ngrx/store';
import { CinemaRoom } from '../../models/cinema-room.model';
import { Cinema } from '../../models/cinema.model';
import * as CinemaActions from './cinema.actions';

export const cinemaFeatureKey = 'cinema';

export interface State {
  cinemas: Cinema[];
  cinemaRooms: CinemaRoom[];
  activeCinema: Cinema | null;
  activeRoom: CinemaRoom | null;
}

const DUMMY_CINEMAS: Cinema[] = [
  {
    id: 0,
    name: 'Ayala Malls - Glorietta',
    location: 'Makati',
  },
  {
    id: 1,
    name: 'Ayala Malls - Greenbelt',
    location: 'Makati',
  },
  {
    id: 2,
    name: 'SM Aura',
    location: 'Taguig',
  },
];

const DUMMY_CINEMA_ROOMS: CinemaRoom[] = [
  {
    id: 0,
    cinemaId: 0,
    name: 'Cinema 1',
    schedule: [],
  },
  {
    id: 1,
    cinemaId: 0,
    name: 'Cinema 2',
    schedule: [],
  },
  {
    id: 2,
    cinemaId: 1,
    name: 'Cinema 1',
    schedule: [],
  },
  {
    id: 3,
    cinemaId: 2,
    name: 'Cinema 1',
    schedule: [],
  },
];

export const initialState: State = {
  cinemas: DUMMY_CINEMAS,
  cinemaRooms: DUMMY_CINEMA_ROOMS,
  activeCinema: null,
  activeRoom: null,
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
      return {
        ...state,
        cinemaRooms: [...state.cinemaRooms, action.cinemaRoom],
      };
    }),
    on(CinemaActions.setActiveCinema, (state, action) => {
      return {
        ...state,
        activeCinema: { ...action.cinema },
      };
    })
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectCinemasState, // feature selector
  selectCinemas, // selector for `cinemas` property
  selectCinemaRooms,
  selectActiveCinema,
  selectActiveRoom,
} = cinemasFeature;
