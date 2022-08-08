import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, createFeature, on } from '@ngrx/store';
import { CinemaRoomSchedule } from '../../models/cinema-room-schedule.model';
import { Room } from '../../models/room.model';
import { Cinema } from '../../models/cinema.model';
import * as CinemaActions from './cinema.actions';

export const cinemaFeatureKey = 'cinemasData';

export const cinemasAdapter: EntityAdapter<Cinema> =
  createEntityAdapter<Cinema>();

export interface State extends EntityState<Cinema> {
  schedules: CinemaRoomSchedule[];
}

const DUMMY_CINEMA_ROOM_SCHEDULES: CinemaRoomSchedule[] = [
  {
    id: 0,
    cinemaId: 0,
    cinemaRoomId: 0,
    movieId: 0,
    seat: [],
    dayOfWeek: 0,
    startTime: new Date(2022, 9, 17, 11, 15, 0),
    endTime: new Date(2022, 9, 17, 14, 15, 0),
    ticketPrice: 200,
  },
  {
    id: 1,
    cinemaId: 1,
    cinemaRoomId: 0,
    movieId: 0,
    seat: [],
    dayOfWeek: 0,
    startTime: new Date(2022, 9, 17, 14, 30, 0),
    endTime: new Date(2022, 9, 17, 16, 30, 0),
    ticketPrice: 200,
  },
  {
    id: 2,
    cinemaId: 0,
    cinemaRoomId: 0,
    movieId: 2,
    seat: [],
    dayOfWeek: 0,
    startTime: new Date(2022, 9, 17, 16, 45, 0),
    endTime: new Date(2022, 9, 17, 18, 45, 0),
    ticketPrice: 200,
  },
];

export const cinemasFeature = createFeature({
  name: cinemaFeatureKey,
  reducer: createReducer(
    cinemasAdapter.getInitialState({
      schedules: DUMMY_CINEMA_ROOM_SCHEDULES,
    }),
    on(CinemaActions.loadCinemasSuccess, (state, action) => {
      return cinemasAdapter.addMany(action.cinemas, state);
    }),
    on(CinemaActions.deleteCinemaSuccess, (state, action) => {
      return cinemasAdapter.removeOne(action.cinemaId, state);
    }),
    on(CinemaActions.addCinemaSuccess, (state, action) => {
      return cinemasAdapter.addOne(action.cinema, state);
    }),
    // on(CinemaActions.editCinemaSuccess, (state, action) => {
    //   //get index
    //   let targetIndex = state.cinemas.findIndex(
    //     (m) => m.id === action.cinema.id
    //   );

    //   // assign new item
    //   const newCinemas = [...state.cinemas];
    //   newCinemas[targetIndex] = action.cinema;

    //   return {
    //     ...state,
    //     cinemas: [...newCinemas],
    //   };
    // }),
    // on(CinemaActions.addCinemaRoomSuccess, (state, action) => {
    //   return {
    //     ...state,
    //     cinemaRooms: [...state.cinemaRooms, action.cinemaRoom],
    //   };
    // }),
    // on(CinemaActions.addCinemaRoomScheduleSuccess, (state, action) => {
    //   return {
    //     ...state,
    //     schedules: [...state.schedules, action.newSchedule],
    //   };
    // })
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
} = cinemasFeature;
