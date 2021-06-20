import type {AppProps} from 'next/app';
import GlobalStyle from '../theme/GlobalStyle';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
