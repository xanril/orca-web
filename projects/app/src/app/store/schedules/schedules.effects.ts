import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError, of, withLatestFrom } from 'rxjs';
import { SchedulesService } from '../../services/schedules.service';
import * as SchedulesActions from './schedules.actions';
import * as SchedulesSelectors from './schedules.selectors';

@Injectable()
export class SchedulesEffects {
  constructor(
    private actions$: Actions,
    private schedulesService: SchedulesService,
    private store: Store
  ) {}

  loadSchedules$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchedulesActions.loadSchedules),
      mergeMap(() =>
        this.schedulesService.getSchedules().pipe(
          map((data) => SchedulesActions.loadSchedulesSuccess({ schedules: data })),
          catchError((error) => of(SchedulesActions.loadSchedulesFailure({ error })))
        )
      )
    );
  });

  deleteSchedule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchedulesActions.deleteSchedule),
      mergeMap((actionData) =>
        this.schedulesService.deleteSchedule(actionData.id).pipe(
          map((data) => SchedulesActions.deleteScheduleSuccess({ id: data })),
          catchError((error) => of(SchedulesActions.deleteScheduleFailure({ error })))
        )
      )
    );
  });

  updateSchedule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchedulesActions.updateSchedule),
      mergeMap((actionData) =>
        this.schedulesService.updateSchedule(actionData.schedule).pipe(
          map((data) => SchedulesActions.updateScheduleSuccess({ schedule: data })),
          catchError((error) => of(SchedulesActions.updateScheduleFailure({ error })))
        )
      )
    );
  });

  addSchedule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchedulesActions.addSchedule),
      withLatestFrom(this.store.select(SchedulesSelectors.selectTotalCount)),
      mergeMap(([actionData, totalSchedulesCount]) =>
        this.schedulesService
          .addSchedule({
            ...actionData.schedule,
            id: totalSchedulesCount,
          })
          .pipe(
            map((data) => SchedulesActions.addScheduleSuccess({ schedule: data })),
            catchError((error) => of(SchedulesActions.addScheduleFailure({ error })))
          )
      )
    );
  });
}
