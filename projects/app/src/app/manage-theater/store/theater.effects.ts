import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs';
import { TheaterRoom } from '../../models/theater-room.model';
import { Theater } from '../../models/theater.model';
import { AppState } from '../../store';
import * as TheaterActions from './theater.actions';

@Injectable()
export class TheaterEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  addTheater$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TheaterActions.addTheater),
      withLatestFrom(this.store.select('theaters')),
      map(([actionData, state]) => {

        // TODO: call Add Theaters API

        let theaterRooms = actionData.roomNames.map<TheaterRoom>(
          (value, index) => {
            return {
              id: state.theaters.length + index,
              name: value,
              schedule: [],
            };
          }
        );

        const newTheater: Theater = {
          id: state.theaters.length,
          name: actionData.name,
          location: actionData.location,
          theaterRooms: theaterRooms,
          movies: [],
        };

        return TheaterActions.addTheaterSuccess({ theater: newTheater });
      })
    )
  );
}
