import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  :root {
    --dodger-blue: 33, 145, 241;
    --white: 248, 249, 250;
    --grey-1: 233, 236, 239;
    --grey-2: 222, 226, 230;
    --grey-3: 206, 212, 218;
    --grey-4: 173, 181, 189;
    --grey-5: 108, 117, 125;
    --grey-6: 73, 80, 87;
    --grey-7: 52, 58, 64;
    --black: 33, 37, 41;

    --bg-color-0: var(--white);
    --bg-color-1: var(--grey-1);
    --bg-color-2: var(--grey-2);
    --bg-color-3: var(--grey-3);
    --text-color: var(--black);

    --focus-color: var(--dodger-blue);

    @media (prefers-color-scheme: dark) {
      --bg-color-0: var(--black);
      --bg-color-1: var(--grey-7);
      --bg-color-2: var(--grey-6);
      --bg-color-3: var(--grey-5);
      --text-color: var(--white);
    }
  }


  body {
    background-color: rgb(var(--bg-color-0));
    color: rgb(var(--text-color));
  }
`;
