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
              id: state.cinemas.length + index,
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
}
