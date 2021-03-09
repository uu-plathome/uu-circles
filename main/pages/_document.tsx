import Document, { Head, Html, Main, NextScript } from 'next/document'
import { existsGaId, GA_ID } from '@/lib/utils/Gtag'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head prefix="og: http://ogp.me/ns#">
          <meta name="theme-color" content="#ff0000" />
          <meta name="format-detection" content="telephone=no" />

          {/** M PLUS 1p */}
          <link
            href="https://fonts.googleapis.com/css?family=M+PLUS+1p:300,400,700&display=swap"
            rel="stylesheet"
          ></link>

          {/* Google Analytics */}
          {existsGaId && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_ID}', {
                                page_path: window.location.pathname,
                            });`,
                }}
              />
            </>
          )}
        </Head>
        <body className="font-body">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
