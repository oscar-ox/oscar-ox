import useSWR from "swr";

import { useToken } from "./token";
import { useUser } from "./user";
import { AxiosInstace1 } from "../utils/axios";

// api type
export type useApiType = {
  loading: boolean;
  data: object;
  error: object;
};

// hook for making get api requests
export function useApi(url: string): useApiType {
  // register the hooks required
  const { token, setToken } = useToken();
  const { setUser } = useUser();

  // setup refresh function
  const refreshToken = (): string | undefined => {
    // call the refresh
    const RefreshInstacer = AxiosInstace1();

    // request the new token
    RefreshInstacer.post("/auth/refresh");

    // update the session vars
    setToken("hello");
    setUser({ loggedIn: false });

    // return the new token
    return token;
  };

  // create the axios instace
  const fetcher = (url: string) =>
    AxiosInstace1(refreshToken, token)
      .get(url)
      .then((res) => res.data);

  // make the request
  const { data, error } = useSWR([url], fetcher);

  // check if the data is loading
  const loading = !data && !error;

  // return all the variables
  return { loading, data, error };
}
