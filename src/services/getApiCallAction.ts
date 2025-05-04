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
): Promise<T> {
  try {
    const response = await axios.get<OmdbApiResponse<T>>(url, options);

    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    const data = response.data;

    if (data.Response === 'False') {
      console.warn('OMDb API responded with error:', data.Error);
      throw new Error(data.Error || 'Unknown error from OMDb API');
    }

    if (respType === 'search') {
      if (!data.Search) {
        throw new Error('Search results not found');
      }
      return data.Search;
    } else {
      return data as unknown as T;
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('API call error:', message);
    throw new Error(message);
  }
}

export default getApiCallAction;
