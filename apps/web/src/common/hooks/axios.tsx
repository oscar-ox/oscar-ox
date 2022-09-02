import { createContext, useContext, ReactNode } from "react";

import axios, { AxiosInstance } from "axios";

import { AxiosInstace1 } from "../utils/axios";
import { Configuration, AuthApi } from "../../common/utils/api-client";

import { useToken } from "./token";
import { useUser } from "./user";

// token context type
type axiosContextType = AxiosInstance;

// default vlaues for the context
const axiosContextDefaultValues = axios.create();

export const AxiosContext = createContext<axiosContextType>(
  axiosContextDefaultValues
);
export const useAxios = () => useContext(AxiosContext);

// provider props
type Props = {
  children: ReactNode;
};

const configuration = new Configuration({});

export function AxiosProvider({ children }: Props) {
  const { token, setToken } = useToken();
  const { setUser } = useUser();

  // setup refresh function
  const refreshToken = (): Promise<string> => {
    // create the auth api
    const authApi = new AuthApi(configuration, "", AxiosInstace1());

    // request the new token
    return authApi
      .authControllerRefresh()
      .then((response) => {
        setToken(response.data.accessToken);
        return response.data.accessToken;
      })
      .catch(() => {
        setUser({ loggedIn: false });
        return "y";
      });
  };

  const instance = AxiosInstace1(refreshToken, token, false);

  return (
    <AxiosContext.Provider value={instance}>{children}</AxiosContext.Provider>
  );
}
