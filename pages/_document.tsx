import React from 'react';
import Document, {DocumentContext} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

class AppDocument extends Document {
  // see: https://github.com/vercel/next.js/blob/master/examples/with-styled-components
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}

export default AppDocument;
