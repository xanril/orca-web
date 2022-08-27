import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs';
import * as SchedulesPageActions from './schedules-page.actions';
import * as RoomsSelectors from '../../store/rooms/rooms.selectors';
import { Injectable } from '@angular/core';

@Injectable()
export class SchedulesPageEffects {
  constructor(private actions$: Actions, private store: Store) {}

  setActiveRoom$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchedulesPageActions.setActiveRoomId),
      mergeMap((actionData) => {
        return this.store.select(RoomsSelectors.selectRoomWithId(actionData.id));
      }),
      map((room) => {
        if (room === undefined) {
          return SchedulesPageActions.setError({ error: "room is undefined" });
        }

        return SchedulesPageActions.setActiveCinemaId({ id: room!.cinemaId });
      })
    );
  });
}
