import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom, mergeMap, catchError, of } from 'rxjs';
import { Room } from '../../models/room.model';
import { Cinema } from '../../models/cinema.model';
import { AppState } from '..';
import { cinemasFeature } from './cinemas.reducer';
import { Schedule } from '../../models/schedule.model';
import { CinemasService } from '../../services/cinemas.service';
import * as CinemasActions from './cinema.actions';
import * as CinemasSelectors from './cinema.selectors';

@Injectable()
export class CinemaEffects {
  constructor(
    private actions$: Actions,
    private cinemasService: CinemasService,
    private store: Store<AppState>
  ) {}

  loadCinemas$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CinemasActions.loadCinemas),
      mergeMap(() =>
        this.cinemasService.getCinemas().pipe(
          map((data) => CinemasActions.loadCinemasSuccess({ cinemas: data })),
          catchError((error) =>
            of(CinemasActions.loadCinemasFailure({ error }))
          )
        )
      )
    );
  });

  deleteCinema$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CinemasActions.deleteCinema),
      mergeMap((actionData) =>
        this.cinemasService.deleteCinema(actionData.cinemaId).pipe(
          map((data) => CinemasActions.deleteCinemaSuccess({ cinemaId: data })),
          catchError((error) =>
            of(CinemasActions.deleteCinemaFailure({ error }))
          )
        )
      )
    );
  });

  addCinema$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CinemasActions.addCinema),
      withLatestFrom(
        this.store.select(CinemasSelectors.selectTotalCinemasCount)
      ),
      map(([actionData, totalCount]) => {
        // TODO: call Add Cinema API

        const newCinema: Cinema = {
          ...actionData.cinema,
          id: totalCount,
        };

        return CinemasActions.addCinemaSuccess({ cinema: newCinema });
      })
    )
  );

  editCinema$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CinemasActions.editCinema),
      mergeMap((actionData) =>
        this.cinemasService.updateCinema(actionData.cinema).pipe(
          map((data) => CinemasActions.editCinemaSuccess({ cinema: data })),
          catchError((error) => of(CinemasActions.editCinemaFailure({ error })))
        )
      )
    );
  });

  // editCinema$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CinemasActions.editCinema),
  //     withLatestFrom(this.store.select('cinemas')),
  //     map(([actionData, state]) => {
  //       // TODO: call Edit Cinema API

  //       const editedCinema: Cinema = {
  //         id: actionData.id,
  //         name: actionData.name,
  //         location: actionData.location,
  //       };
  //       return CinemasActions.editCinemaSuccess({ cinema: editedCinema });
  //     })
  //   )
  // );

  // addCinemaRoom$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CinemasActions.addCinemaRoom),
  //     withLatestFrom(this.store.select('cinemas')),
  //     map(([actionData, state]) => {
  //       // TODO: call Add CinemaRoom API

  //       const newCinemaRoom: CinemaRoom = {
  //         id: state.cinemaRooms.length,
  //         cinemaId: actionData.cinemaId,
  //         name: actionData.roomName,
  //       };

  //       return CinemasActions.addCinemaRoomSuccess({
  //         cinemaId: 0,
  //         cinemaRoom: newCinemaRoom,
  //       });
  //     })
  //   )
  // );

  // addCinemaRoomSchedule$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CinemasActions.addCinemaRoomSchedule),
  //     withLatestFrom(this.store.select(cinemasFeature.selectSchedules)),
  //     map(([actionData, state]) => {
  //       // TODO: call Add CinemaRoomSchedule API

  //       const newSchedule: CinemaRoomSchedule = {
  //         id: state.length,
  //         cinemaId: actionData.cinemaId,
  //         cinemaRoomId: actionData.cinemaRoomId,
  //         movieId: actionData.movieId,
  //         seat: [],
  //         dayOfWeek: actionData.dayOfWeek,
  //         startTime: actionData.startTime,
  //         endTime: actionData.endTime,
  //         ticketPrice: actionData.ticketPrice,
  //       };

  //       return CinemasActions.addCinemaRoomScheduleSuccess({
  //         newSchedule: newSchedule,
  //       });
  //     })
  //   )
  // );
}
