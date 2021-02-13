import Document, { Head, Html, Main, NextScript } from 'next/document'
import { useRouter } from 'next/router'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        const router = useRouter()
        return (
            <Html>
                <Head>
                    <meta name="theme-color" content="#ff0000" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="viewport" content="width=device-width,initial-scale=1" />
                    <meta property="og:type" content={router.pathname === '/' ? 'website' : 'article'} />
                    <meta property="og:site_name" content="サークルビラ一覧管理者画面" />
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:site" content="@Ulab_uu" />

                    {/** M PLUS 1p */}
                    <link href="https://fonts.googleapis.com/css?family=M+PLUS+1p" rel="stylesheet"></link>
                </Head>
                <body className="font-body">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}