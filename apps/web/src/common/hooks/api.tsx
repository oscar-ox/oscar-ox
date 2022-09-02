import useSWR from "swr";
import { AxiosInstance } from "axios";

// api type
export type useApiType = {
  loading: boolean;
  data: any;
  error: any;
};

// hook for making get api requests
export function useApi(axios: AxiosInstance, url: string): useApiType {
  // create the axios instace
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  // make the request
  const { data, error } = useSWR([url], fetcher);

  // check if the data is loading
  const loading = !data && !error;

  // return all the variables
  return { loading, data, error };
}
