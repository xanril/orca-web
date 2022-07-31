import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs';
import { CinemaRoom } from '../../models/cinema-room.model';
import { Cinema } from '../../models/cinema.model';
import { AppState } from '../../store';
import * as CinemaActions from './cinema.actions';

@Injectable()
export class CinemaEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  addCinema$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CinemaActions.addCinema),
      withLatestFrom(this.store.select('cinemas')),
      map(([actionData, state]) => {
        // TODO: call Add Cinema API

        let cinemaRooms = actionData.roomNames.map<CinemaRoom>(
          (value, index) => {
            return {
              id: index,
              name: value,
              schedule: [],
            };
          }
        );

        const newCinema: Cinema = {
          id: state.cinemas.length,
          name: actionData.name,
          location: actionData.location,
          cinemaRooms: cinemaRooms,
          movies: [],
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

        // get cinema item from state
        const cinema = state.cinemas.find((m) => m.id === actionData.id);
        const cinemaRooms = cinema?.cinemaRooms.slice() ?? [];
        const movies = cinema?.movies.slice() ?? [];

        const editedCinema: Cinema = {
          id: actionData.id,
          name: actionData.name,
          location: actionData.location,
          cinemaRooms: cinemaRooms,
          movies: movies,
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

        // get cinema item from state
        const targetCinema = state.cinemas.find((m) => m.id === actionData.cinemaId);

        const newCinemaRoom: CinemaRoom = {
          id: targetCinema?.cinemaRooms.length ?? 0,
          name: actionData.roomName,
          schedule: []
        };

        return CinemaActions.addCinemaRoomSuccess({ cinemaId: 0, cinemaRoom: newCinemaRoom });
      })
    )
  );
}
