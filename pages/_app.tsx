import '../styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  console.log('pageProps:', pageProps)
  return <Component {...pageProps} />
}
