import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import store, { rootReducer } from '../redux/store';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
