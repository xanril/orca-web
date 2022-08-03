import { createReducer, createFeature, on } from '@ngrx/store';
import { CinemaRoomSchedule } from '../../models/cinema-room-schedule.model';
import { CinemaRoom } from '../../models/cinema-room.model';
import { Cinema } from '../../models/cinema.model';
import * as CinemaActions from './cinema.actions';

export const cinemaFeatureKey = 'cinemas';

export interface State {
  cinemas: Cinema[];
  cinemaRooms: CinemaRoom[];
  schedules: CinemaRoomSchedule[];
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
  },
  {
    id: 1,
    cinemaId: 0,
    name: 'Cinema 2',
  },
  {
    id: 2,
    cinemaId: 1,
    name: 'Cinema 1',
  },
  {
    id: 3,
    cinemaId: 2,
    name: 'Cinema 1',
  },
];

const DUMMY_CINEMA_ROOM_SCHEDULES: CinemaRoomSchedule[] = [
  {
    id: 0,
    cinemaId: 0,
    cinemaRoomId: 0,
    movieId: 0,
    seat: [],
    startTime: new Date(2022, 9, 17, 11, 15, 0),
    endTime: new Date(2022, 9, 17, 14, 15, 0),
  },
  {
    id: 1,
    cinemaId: 1,
    cinemaRoomId: 0,
    movieId: 0,
    seat: [],
    startTime: new Date(2022, 9, 17, 14, 30, 0),
    endTime: new Date(2022, 9, 17, 16, 30, 0),
  },
  {
    id: 2,
    cinemaId: 0,
    cinemaRoomId: 0,
    movieId: 2,
    seat: [],
    startTime: new Date(2022, 9, 17, 16, 45, 0),
    endTime: new Date(2022, 9, 17, 18, 45, 0),
  },
];

export const initialState: State = {
  cinemas: DUMMY_CINEMAS,
  cinemaRooms: DUMMY_CINEMA_ROOMS,
  schedules: DUMMY_CINEMA_ROOM_SCHEDULES,
};

export const cinemasFeature = createFeature({
  name: cinemaFeatureKey,
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
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
  selectCinemasState, // feature selector
  selectCinemas, // selector for `cinemas` property
  selectCinemaRooms,
} = cinemasFeature;
