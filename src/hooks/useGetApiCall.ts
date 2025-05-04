import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import getApiCallAction from '../services/getApiCallAction';
import { KeyTypes, ValueType } from '../types';
import { setApiError, setApiResponse } from '../redux/slices/Movie/movieSlice';
import { useAppDispatch } from '../types/store.type';

interface GetAPICall<T> extends Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'> {
  url: string;
  key: KeyTypes;
  option?: AxiosRequestConfig;
  lng?: string;
  enabled?: boolean;
}

const useGetApiCall = <T extends ValueType>({
  key,
  option,
  url,
  enabled = true,
}: GetAPICall<T>) => {
  const dispatch = useAppDispatch();

  return useQuery<T, Error>({
    queryKey: [key, url, option?.params],
    queryFn: async () => {
      const hasParams = option?.params && Object.keys(option.params).length > 0;
      if (!hasParams) {
        return {} as T;
      }

      const res = await getApiCallAction<T>(url, option, key === 'searchedMovies' ? 'search' : 'detail');
      
      if (res) {
        dispatch(setApiResponse({ key, value: res }));
        dispatch(setApiError(false))
        return res;
      }
      else {
        dispatch(setApiError(true))
      }

      return {} as T;
    },
    enabled,
    refetchOnWindowFocus: false,
  });
};

export default useGetApiCall;
