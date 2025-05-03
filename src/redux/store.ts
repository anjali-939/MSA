import { logger } from 'redux-logger';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { movieSlice } from './slices/Movie';

export const rootReducer = combineReducers({
	[movieSlice.name]: movieSlice.reducer,
});
const isDevEnvironment = true;
const store = configureStore({
	reducer: rootReducer,
	...(isDevEnvironment ? { middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger) } : {}),
	devTools: isDevEnvironment,
});

export default store;
