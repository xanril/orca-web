import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, catchError, of } from 'rxjs';
import { Cinema } from '../../models/cinema.model';
import { AppState } from '..';
import { CinemasService } from '../../services/cinemas.service';
import * as CinemasActions from './cinema.actions';

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
          catchError((error) => of(CinemasActions.loadCinemasFailure({ error })))
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
          catchError((error) => of(CinemasActions.deleteCinemaFailure({ error })))
        )
      )
    );
  });

  addCinema$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CinemasActions.addCinema),
      mergeMap((actionData) => {
        const newCinema: Cinema = {
          ...actionData.cinema,
          id: 0,
        };

        return this.cinemasService.addCinema(newCinema).pipe(
          map((data) => CinemasActions.addCinemaSuccess({ cinema: data })),
          catchError((error) => of(CinemasActions.addCinemaFailure({ error })))
        );
      })
    );
  });

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
}
