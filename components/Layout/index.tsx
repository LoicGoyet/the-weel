import styled from 'styled-components';
import Card from '../Card';
import React from 'react';

export type Props = {
  aside: React.ReactNode;
  main: React.ReactNode;
};

const Layout = ({aside = <></>, main = <></>}: Props) => {
  const [isAsideOpen, setIsAsideOpen] = React.useState(true);

  const toggleIsAsideOpen = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e?.preventDefault();
    setIsAsideOpen(isAsideOpen => !isAsideOpen);
  };

  return (
    <Wrapper>
      <Main>
        <ContentCard>
          <header>
            <Card>
              <a href='#aside' onClick={toggleIsAsideOpen}>
                Configure
              </a>
            </Card>
          </header>

          <MainBody>{main}</MainBody>
        </ContentCard>
      </Main>

      <Aside id='aside' style={{'--translate-x': isAsideOpen ? '0' : '100%'}}>
        <ContentCard>
          <div>
            <a href='#aside' onClick={toggleIsAsideOpen}>
              Close
            </a>
            {aside}
          </div>
        </ContentCard>
      </Aside>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  height: 100vh;
  padding: 1rem;
`;

const ContentCard = styled(Card)`
  display: grid;
  height: 100%;
  max-height: 100%;
  grid-template-rows: auto 1fr auto;
  padding-top: 0;
  padding-bottom: 0;

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

const Aside = styled.aside<{style: {'--translate-x': '0' | `${number}%`}}>`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  transform: translateX(var(--translate-x));
  transition: transform 0.3s ease-in-out;
  padding: 1rem;
`;

const MainBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    flex-grow: 1;
  }
`;
