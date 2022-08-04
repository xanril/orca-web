import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs';
import { CinemaRoom } from '../../models/cinema-room.model';
import { Cinema } from '../../models/cinema.model';
import { AppState } from '..';
import * as CinemaActions from './cinema.actions';
import { cinemasFeature } from './cinemas.reducer';
import { CinemaRoomSchedule } from '../../models/cinema-room-schedule.model';

@Injectable()
export class CinemaEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  addCinema$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CinemaActions.addCinema),
      withLatestFrom(this.store.select('cinemas')),
      map(([actionData, state]) => {
        // TODO: call Add Cinema API

        const newCinema: Cinema = {
          id: state.cinemas.length,
          name: actionData.name,
          location: actionData.location,
        };

        return CinemaActions.addCinemaSuccess({ cinema: newCinema });
      })
    )
  );

  editCinema$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CinemaActions.editCinema),
      withLatestFrom(this.store.select('cinemas')),
      map(([actionData, state]) => {
        // TODO: call Edit Cinema API

        const editedCinema: Cinema = {
          id: actionData.id,
          name: actionData.name,
          location: actionData.location,
        };
        return CinemaActions.editCinemaSuccess({ cinema: editedCinema });
      })
    )
  );

  addCinemaRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CinemaActions.addCinemaRoom),
      withLatestFrom(this.store.select('cinemas')),
      map(([actionData, state]) => {
        // TODO: call Add CinemaRoom API

        const newCinemaRoom: CinemaRoom = {
          id: state.cinemaRooms.length,
          cinemaId: actionData.cinemaId,
          name: actionData.roomName,
        };

        return CinemaActions.addCinemaRoomSuccess({
          cinemaId: 0,
          cinemaRoom: newCinemaRoom,
        });
      })
    )
  );

  addCinemaRoomSchedule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CinemaActions.addCinemaRoomSchedule),
      withLatestFrom(this.store.select(cinemasFeature.selectSchedules)),
      map(([actionData, state]) => {
        // TODO: call Add CinemaRoomSchedule API

        const newSchedule: CinemaRoomSchedule = {
          id: state.length,
          cinemaId: actionData.cinemaId,
          cinemaRoomId: actionData.cinemaRoomId,
          movieId: actionData.movieId,
          seat: [],
          startTime: actionData.startTime,
          endTime: actionData.endTime,
        };

        return CinemaActions.addCinemaRoomScheduleSuccess({
          newSchedule: newSchedule,
        });
      })
    )
  );
}
