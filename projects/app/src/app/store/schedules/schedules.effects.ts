import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { Schedule } from '../../models/schedule.model';
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
      mergeMap((actionData) => {
        const newSchedule: Schedule = {
          ...actionData.schedule,
          id: 0,
        };

        return this.schedulesService.addSchedule(newSchedule).pipe(
          map((data) => SchedulesActions.addScheduleSuccess({ schedule: data })),
          catchError((error) => of(SchedulesActions.addScheduleFailure({ error })))
        );
      })
    );
  });
}
