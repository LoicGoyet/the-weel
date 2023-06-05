import * as React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
  htmlFor: string;
  children: React.ReactNode;
};

const Label = ({className, htmlFor, children}: Props) => {
  return (
    <Wrapper className={className} htmlFor={htmlFor}>
      {children}
    </Wrapper>
  );
};

export default Label;

const Wrapper = styled.label`
  display: block;
  width: 100%;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;
