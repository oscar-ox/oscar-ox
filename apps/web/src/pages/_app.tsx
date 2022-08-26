import type { AppProps } from "next/app";

import { TokenProvider } from "../common/hooks";
import "../../styles/globals.css";


function MyApp({ Component, pageProps }: AppProps) {

  return (
      <TokenProvider>
        <Component {...pageProps} />
      </TokenProvider>
  );
}

export default MyApp;
