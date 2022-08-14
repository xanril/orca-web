import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateHelperService {
  intervalFactorMs: number = 1000 * 60 * 15; // 15 minutes in milliseconds

  constructor() {}

  calculateEndTime(startTime: Date, movieRuntimeMins: number): Date {
    // convert movieRuntimeMins to milliseconds
    const durationMs = movieRuntimeMins * 1000 * 60;

    // round UP to nearest 15-min factor
    const remainder = durationMs % this.intervalFactorMs;
    const roundedDurationMs =
      durationMs + (remainder == 0 ? remainder : Math.abs(remainder - this.intervalFactorMs));

    // add the rounded UP duration to the start time.
    const endDate = new Date(startTime.getTime() + roundedDurationMs);
    return endDate;
  }

  generateStartTimeOptions(seedDate: Date): Date[] {
    let startDate = new Date(seedDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 24);
    const startTimeOptions: Date[] = [];

    do {
      startTimeOptions.push(new Date(startDate));
      startDate = new Date(startDate.getTime() + this.intervalFactorMs);
    } while (startDate < endDate);

    return startTimeOptions;
  }

  checkIfTimeBound(targetDate: Date, lowerBoundDate: Date, upperBoundDate: Date): boolean {
    // convert to same day
    const convertedLowerBound = new Date(targetDate);
    convertedLowerBound.setHours(lowerBoundDate.getHours(), lowerBoundDate.getMinutes());

    const convertedUpperBound = new Date(targetDate);
    convertedUpperBound.setHours(upperBoundDate.getHours(), upperBoundDate.getMinutes());

    if (
      targetDate.getTime() >= convertedLowerBound.getTime() &&
      targetDate.getTime() <= convertedUpperBound.getTime()
    ) {
      return true;
    }

    return false;
  }
}
