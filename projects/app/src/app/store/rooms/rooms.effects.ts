import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, concatMap, of, withLatestFrom } from 'rxjs';
import { RoomsService } from '../../services/rooms.service';
import * as RoomsActions from './rooms.actions';
import * as RoomsSelectors from './rooms.selectors';

@Injectable()
export class RoomsEffects {
  constructor(
    private actions$: Actions,
    private roomsService: RoomsService,
    private store: Store
  ) {}

  loadRooms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoomsActions.loadRooms),
      mergeMap(() =>
        this.roomsService.getRooms().pipe(
          map((data) => RoomsActions.loadRoomsSuccess({ rooms: data })),
          catchError((error) => of(RoomsActions.loadRoomsFailure({ error })))
        )
      )
    );
  });

  addRoom$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoomsActions.addRoom),
      withLatestFrom(this.store.select(RoomsSelectors.selectTotalCount)),
      mergeMap(([actionData, totalRoomCount]) =>
        // TODO: Derive the ID from the service response
        this.roomsService
          .addRoom({
            ...actionData.room,
            id: totalRoomCount,
          })
          .pipe(
            map((data) => RoomsActions.addRoomSuccess({ room: data })),
            catchError((error) => of(RoomsActions.addRoomFailure({ error })))
          )
      )
    );
  });

  editRoom$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoomsActions.editRoom),
      mergeMap((actionData) =>
        this.roomsService.updateRoom(actionData.room).pipe(
          map((data) => RoomsActions.editRoomSuccess({ room: data })),
          catchError((error) => of(RoomsActions.editRoomFailure({ error })))
        )
      )
    );
  });

  deleteRoom$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RoomsActions.deleteRoom),
      concatMap((actionData) =>
        this.roomsService.deleteRoom(actionData.roomId).pipe(
          map((data) => RoomsActions.deleteRoomSuccess({ roomId: data })),
          catchError((error) => of(RoomsActions.deleteRoomFailure({ error })))
        )
      )
    );
  });
}
