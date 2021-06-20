import React from "react";
import GlobalStyle from '../theme/GlobalStyle';

export const GlobalDecorator = (storyFn) => {
  return (
    <>
      <GlobalStyle />
      {storyFn()}
    </>
  )
}