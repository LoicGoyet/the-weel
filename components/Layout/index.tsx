import styled from 'styled-components';
import Card from '../Card';

export type Props = {
  aside: React.ReactNode;
  main: React.ReactNode;
  footer: React.ReactNode;
};

const Layout = ({aside = <></>, main = <></>, footer = <></>}: Props) => {
  const handleOpenAsideClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | undefined,
  ) => {
    e?.preventDefault();
    document.querySelector('#aside')?.scrollIntoView({behavior: 'smooth'});
  };

  const handleCloseAsideClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | undefined,
  ) => {
    e?.preventDefault();
    document.querySelector('#main')?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <Wrapper>
      <Main id='main'>
        <ContentCard>
          <header>
            <Card>
              <a onClick={handleOpenAsideClick} href='#aside'>
                Configure
              </a>
            </Card>
          </header>

          <div>{main}</div>
          <footer>{footer}</footer>
        </ContentCard>
      </Main>

      <Aside id='aside'>
        <ContentCard>
          <div>
            <a onClick={handleCloseAsideClick} href='#main'>
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
  --gap: 1rem;
  --aside-width: max(33vw, 300px);

  display: grid;
  grid-template-columns: calc(100vw - var(--gap)) var(--aside-width);
  grid-template-rows: calc(100vh - calc(var(--gap) * 2));
  height: 100vh;
  gap: var(--gap);
  overflow: auto;
  scroll-snap-type: x mandatory;
  scroll-margin: var(--gap);
  padding: var(--gap) 0;

  & > * {
    scroll-snap-align: center;
  }

  @media (min-width: 60rem) {
    grid-template-columns: 1fr var(--aside-width);
  }
`;

const ContentCard = styled(Card)`
  display: grid;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  grid-template-rows: auto 1fr auto;
  grid-gap: var(--gap);
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
  padding-left: var(--gap);
`;

const Aside = styled.aside`
  padding-right: var(--gap);
`;
