/* eslint-disable react/jsx-filename-extension */
import * as React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ru">
        <Head>
          <script src="https://vk.com/js/api/openapi.js?169" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
