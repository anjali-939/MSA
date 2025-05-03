import { KeyTypes, ValueType, MovieSliceProps, MovieSummary, MovieDetails } from './../../../types/movie.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState: MovieSliceProps = {
  searchedMovies: [],
  movieDetail: {},
  step: 0
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setApiResponse(state, action: PayloadAction<{ key: KeyTypes, value: ValueType }>) {
      const { key, value } = action.payload;
      if (key === 'searchedMovies' && Array.isArray(value)) {
        state[key] = value as MovieSummary[];
      } else if (key === 'movieDetail' && typeof value === 'object') {
        state[key] = value as Partial<MovieDetails>;
      }
    },
    updateStep(state, action: PayloadAction<number>) {
      state.step = action.payload
    }
  }
})

export const { setApiResponse, updateStep } = movieSlice.actions

export default movieSlice