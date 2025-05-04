import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../types/store.type";

export const selectMovieState = (state: RootState) =>  state.movies

export const selectSearchedMovies = createSelector(selectMovieState,movieState=>movieState.searchedMovies)

export const selectMovieDetail = createSelector(selectMovieState,movieState=>movieState.movieDetail)

export const selectStep = createSelector(selectMovieState,movieState=>movieState.step)

export const selectApiError = createSelector(selectMovieState,movieState=>movieState.apiError)

