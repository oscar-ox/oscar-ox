import type { AppProps } from 'next/app'

import { AuthProvider, TokenProvider } from '../common/hooks'
import '../../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TokenProvider>
        <Component {...pageProps} />
      </TokenProvider>
    </AuthProvider>)
}

export default MyApp
