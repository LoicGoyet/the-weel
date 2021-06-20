import styled, { createGlobalStyle } from 'styled-components';
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle/>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp



const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e5e5f7;
    opacity: 0.8;
    background-image:  radial-gradient(#444cf7 0.5px, transparent 0.5px), radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px);
    background-size: 20px 20px;
    background-position: 0 0,10px 10px;
  }
`