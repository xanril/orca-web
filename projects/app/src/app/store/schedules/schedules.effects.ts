import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { SchedulesService } from '../../services/schedules.service';
import * as SchedulesActions from './schedules.actions';

@Injectable()
export class SchedulesEffects {
  constructor(private actions$: Actions, private schedulesService: SchedulesService) {}

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
}
