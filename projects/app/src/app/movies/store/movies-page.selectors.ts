import { createSelector } from "@ngrx/store";
import { moviesPageFeature } from "./movies-page.reducer";

export const {
    selectActiveMovieId,
    selectSearchResponse,
    selectSearchMovieQuery
} = moviesPageFeature