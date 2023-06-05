import styled from 'styled-components';
import Card from '../designSystem/Card';
import React from 'react';
import {SidePanelProvider} from './SidePanelContext';
import Button from '../designSystem/Button';
import GearIcon from '../icons/GearIcon';

export type Props = {
  main: React.ReactNode;
  panels: Record<string, React.ReactNode>;
};

const Layout = ({main = <></>, panels}: Props) => {
  return (
    <SidePanelProvider>
      {({activePanel, setActivePanel, hasActivePanel}) => {
        const handlePanelTriggerClick = (panelKey: string) => {
          return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            setActivePanel(panelKey);
          };
        };

        return (
          <Wrapper>
            <Main>
              <ContentCard>
                <Header>
                  <Heading>The wheel.</Heading>
                  <Button
                    onClick={handlePanelTriggerClick('items')}
                    isSquare
                    brand='transparent'
                  >
                    <GearIcon width='1em' height='1em' />
                  </Button>
                </Header>

                <MainBody>{main}</MainBody>
              </ContentCard>
            </Main>

            {Object.entries(panels).map(([key, panel]) => {
              const isOpen = activePanel === key;
              return (
                <Aside
                  key={key}
                  style={{
                    '--translate-x': isOpen ? '0' : '100%',
                    '--opacity': isOpen ? 1 : 0,
                  }}
                >
                  {panel}
                </Aside>
              );
            })}

            <Backdrop
              onClick={() => setActivePanel(null)}
              style={{
                '--pointer-events': hasActivePanel ? 'initial' : 'none',
              }}
            />
          </Wrapper>
        );
      }}
    </SidePanelProvider>
  );
};

export default Layout;

const Wrapper = styled.div`
  height: 100vh;
  padding: 0.5rem;
`;

const ContentCard = styled(Card)`
  display: grid;
  height: 100%;
  max-height: 100%;
  grid-template-rows: auto 1fr auto;
  padding-top: 0;
  padding-bottom: 0;
  background-color: #e5e5f7;
  /* opacity: 0.8; */
  background-image: radial-gradient(
      circle at center center,
      rgb(var(--bg-color-0)),
      rgb(var(--bg-color-1))
    ),
    repeating-radial-gradient(
      circle at center center,
      rgb(var(--bg-color-0)),
      rgb(var(--bg-color-0)),
      10px,
      transparent 30px,
      transparent 40px
    );
  background-blend-mode: multiply;

  & > *:first-child {
    padding-top: var(--padding);
  }

  & > *:last-child {
    padding-bottom: var(--padding);
  }
`;

const Main = styled.main`
  height: 100%;
`;

const Aside = styled.div<{
  style: {'--translate-x': '0' | `${number}%`; '--opacity': number};
}>`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  will-change: opacity transform;
  transform: translateX(var(--translate-x));
  opacity: var(--opacity);
  transition: 0.3s ease-in-out;
  padding: 1rem;
  width: 100%;
  max-width: 400px;
  z-index: 3;
`;

const MainBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    flex-grow: 1;
  }
`;

const Backdrop = styled.div<{
  style: {
    '--pointer-events': 'initial' | 'none';
  };
}>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  pointer-events: var(--pointer-events);
`;

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Heading = styled.h1`
  margin: 0;
`;
