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
    --bg-color-0: 255, 255, 255;
    --bg-color-1: 245, 245, 245;
    --bg-color-2: 235, 235, 235;
    --bg-color-3: 225, 225, 225;
    --text-color: 0, 0, 0;

    @media (prefers-color-scheme: dark) {
      --bg-color-0: 35, 35, 35;
      --bg-color-1: 55, 55, 55;
      --bg-color-2: 75, 75, 75;
      --bg-color-3: 95, 95, 95;
      --text-color: 255, 255, 255;
    }
  }


  body {
    background-color: rgb(var(--bg-color-0));
    color: rgb(var(--text-color));
  }
`;
