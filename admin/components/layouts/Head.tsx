import { FC } from 'react';
import NextHead from 'next/head';

type Props = {
  title: string
}

const Head: FC<Props>  = ({
  title
}) => {
  return (
    <NextHead>
      <title>{title} | サークルビラ一覧管理者画面</title>
      <meta property="og:title" content={`${title} | サークルビラ一覧管理者画面`} />
      <meta name="twitter:title" content={`${title} | サークルビラ一覧管理者画面`} />
    </NextHead>
  );
}

export { Head }