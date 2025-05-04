import axios, { type AxiosRequestConfig } from 'axios';

interface OmdbApiResponse<T> {
  Search?: T;
  Error?: string;
  Response: 'True' | 'False';
  [key: string]: unknown;
}

async function getApiCallAction<T>(
  url: string,
  options?: AxiosRequestConfig,
  respType?: 'search' | 'detail'
): Promise<T | null> {
  try {
    const response = await axios.get<OmdbApiResponse<T>>(url, options);

    if (response.status !== 200) {
      console.warn(`Unexpected response status: ${response.status}`);
      return null;
    }

    const data = response.data;

    if (data.Response === 'False') {
      console.warn('OMDb API responded with error:', data.Error);
      return null;
    }

    if (respType === 'search') {
      if (!data.Search) {
        console.warn('Search results not found');
        return null;
      }
      return data.Search;
    } else {
      return data as unknown as T;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('API call error:', message);
    return null;
  }
}

export default getApiCallAction;
