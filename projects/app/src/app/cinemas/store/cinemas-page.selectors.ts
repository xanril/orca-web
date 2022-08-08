import { createSelector } from "@ngrx/store";
import { cinemasPageFeature } from "./cinemas-page.reducer";

export const {
   selectActiveCinemaId 
} = cinemasPageFeature;