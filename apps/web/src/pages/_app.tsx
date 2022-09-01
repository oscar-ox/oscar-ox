import type { AppProps } from "next/app";

import { TokenProvider } from "../common/hooks";
import "../../styles/globals.css";
import { UserProvider } from "../common/hooks/user";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TokenProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </TokenProvider>
  );
}

export default MyApp;
