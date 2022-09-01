import axios from 'axios';

// custom axios instance for api v1
export const AxiosInstace1 = (refreshToken: () => string | undefined = () => { return undefined}, token?: string, preventRefresh: boolean = true) => {
  // axios instance for making requests
  const axiosInstance = axios.create();

  // request interceptor for adding token
  axiosInstance.interceptors.request.use((config) => {
    // add token to request headers
    config.headers['Authorization'] = "Bearer " + token;
    config.baseURL = process.env.NEXT_PUBLIC_API_V1_URL;

    // return the custom config
    return config;
  });

  // response interceptor for refreshing token
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error?.config;
  
      // only refresh token if that was the error and not tried already
      if (error?.response?.status === 401 && !config?.sent && !preventRefresh) {
        config.sent = true;

        // try get a new token
        const newToken = refreshToken();
  
        // check if a new token arrives
        if (newToken) {
          config.headers = {
            ...config.headers,
            authorization: "Bearer " + newToken,
          };

          // return the new config
          return axios(config);
        } else {
          
          // token could not be refresh
          return Promise.reject({error: error, data: error.response.data});
        }

      }

      // the error was not due to an expired token
      return Promise.reject({error: error, data: error.response.data});
    }
  );

  return axiosInstance;
};