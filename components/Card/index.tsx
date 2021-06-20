import * as React from 'react';
import styled from 'styled-components';
import {CardLevelProvider, useCardLevel} from './context';

export type Props = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({children, className}: Props) => {
  const level = useCardLevel();

  if (level > 3) {
    throw new Error("Card can't be nested more than 3 times");
  }

  return (
    <Wrapper
      className={className}
      style={{backgroundColor: `rgb(var(--bg-color-${level}))`}}
    >
      <CardLevelProvider level={level + 1}>{children}</CardLevelProvider>
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.div`
  --spacing: 1.5rem;

  padding: var(--spacing);
  border-radius: 0.25rem;
`;
