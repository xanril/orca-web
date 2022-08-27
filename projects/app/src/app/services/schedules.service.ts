import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Schedule } from '../models/schedule.model';

@Injectable({ providedIn: 'root' })
export class SchedulesService {
  constructor(private http: HttpClient) {}

  getSchedules() {
    return this.http.get<Schedule[]>(environment.apiBaseUrl + '/schedules');
  }

  addSchedule(schedule: Schedule) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<Schedule>(
      environment.apiBaseUrl + '/schedule',
      JSON.stringify(schedule),
      {
        headers: headers,
      }
    );
  }

  deleteSchedule(id: number) {
    return of(id);
  }

  updateSchedule(updatedSchedule: Schedule) {
    return of(updatedSchedule);
  }
}
