import * as React from 'react';
import styled from 'styled-components';
import Button from '../Button';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const SidePanel = ({className, children}: Props) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

export default SidePanel;

const Wrapper = styled.aside`
  --padding: 1.5rem;
  --border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: var(--border-radius);
  color: #000;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

SidePanel.Header = styled.header`
  background-color: rgb(255, 255, 255);
  padding: var(--padding);
  border-top-right-radius: var(--border-radius);
  border-top-left-radius: var(--border-radius);
`;

SidePanel.Heading = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
`;

SidePanel.Body = styled.div`
  padding: var(--padding);
  overflow: auto;
  flex: 1;

  @media (prefers-color-scheme: light) {
    color: rgb(0, 0, 0);
  }

  @media (prefers-color-scheme: dark) {
    color: rgb(255, 255, 255);
  }
`;

SidePanel.BottomButton = styled(Button).attrs({
  size: 'lg',
})`
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
`;
