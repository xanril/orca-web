import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Schedule } from '../../models/schedule.model';
import * as SchedulesActions from './schedules.actions';

export const schedulesFeatureKey = 'schedulesData';

export const schedulesAdapter = createEntityAdapter<Schedule>();

export interface State extends EntityState<Schedule> {}

export const schedulesFeature = createFeature({
  name: schedulesFeatureKey,
  reducer: createReducer(schedulesAdapter.getInitialState(),
  on(SchedulesActions.loadSchedulesSuccess, (state, action) => {
    return schedulesAdapter.addMany(action.schedules, state);
  })),
});

export const { reducer } = schedulesFeature;