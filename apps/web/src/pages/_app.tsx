import type { AppProps } from "next/app";

import { TokenProvider, UserProvider, AxiosProvider } from "../common/hooks";

import "../../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TokenProvider>
      <UserProvider>
        <AxiosProvider>
          <Component {...pageProps} />
        </AxiosProvider>
      </UserProvider>
    </TokenProvider>
  );
}

export default MyApp;
