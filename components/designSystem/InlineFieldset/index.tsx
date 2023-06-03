import * as React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const InlineFieldset = ({className, children}: Props) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

export default InlineFieldset;

const Wrapper = styled.fieldset`
  display: flex;
  align-items: center;
  border: none;
  padding: 0;
  padding: 0.25rem;
  margin: -0.25rem -0.25rem 1rem;
  overflow: visible;
`;
