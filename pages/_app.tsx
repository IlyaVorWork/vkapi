import "../styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script src="https://vk.com/js/api/openapi.js?169" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
