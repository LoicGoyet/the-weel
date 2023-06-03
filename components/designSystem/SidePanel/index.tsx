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
  --padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 0.5rem;
  padding: var(--padding);
  color: #000;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

SidePanel.Header = styled.header`
  background-color: rgb(255, 255, 255);
  margin-top: calc(-1 * var(--padding));
  margin-left: calc(-1 * var(--padding));
  margin-right: calc(-1 * var(--padding));
  padding: var(--padding);
  margin-bottom: var(--padding);
`;

SidePanel.Heading = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
`;

SidePanel.Body = styled.div`
  overflow-y: auto;
  flex: 1;
`;
