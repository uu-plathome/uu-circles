import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#ff0000" />
          <meta name="format-detection" content="telephone=no" />

          {/** M PLUS 1p */}
          <link
            href="https://fonts.googleapis.com/css?family=M+PLUS+1p:300,400,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body id="app" className="font-body">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
