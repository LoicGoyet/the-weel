import type {AppProps} from 'next/app';
import Head from 'next/head';
import GlobalStyle from '../theme/GlobalStyle';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>The Wheel</title>
        <meta
          name='description'
          content='When you have to make a decision between several options, make the wheel spin.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
