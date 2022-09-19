import useSWR from "swr";
import { AxiosRequestConfig } from "axios";

import { ErrorEntity } from "../../common/utils/api-client";

import { AxiosResponse } from "axios";

export function useApi<Type>(
  api: (
    options?: AxiosRequestConfig | undefined
  ) => Promise<AxiosResponse<Type>>,
  key: string = "none"
): {
  loading: boolean;
  data: Type | undefined;
  error: ErrorEntity | undefined;
} {
  const fetcher = () =>
    api()
      .then((response) => response.data)
      .catch((error) => {
        // this is not ideal should use custom reject but is not working
        console.log(error.response.data);
        throw error.response.data;
      });

  // make the request
  const { data, error } = useSWR<Type, ErrorEntity>(key, fetcher);

  // check if the data is loading
  const loading = !data && !error;

  // return all the variables
  return { loading, data, error };
}
