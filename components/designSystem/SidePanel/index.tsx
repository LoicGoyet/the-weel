import * as React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const SidePanel = ({className, children}: Props) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

export default SidePanel;

const Wrapper = styled.aside`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 0.25rem;
  padding: 1.5rem;
  color: #000;
  width: 100%;
  height: 100%;
`;
