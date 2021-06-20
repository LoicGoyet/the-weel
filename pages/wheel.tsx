import styled from 'styled-components';
import Card from '../components/Card';

const Wheel = () => {
  return (
    <Wrapper>
      <Header>header</Header>
      <Card>sidebar</Card>
      <Card>main</Card>
      <Footer>footer</Footer>
    </Wrapper>
  );
};

export default Wheel;

const Wrapper = styled.div`
  --spacing: 1rem;

  padding: var(--spacing);
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-gap: var(--spacing);
  min-height: 100vh;
`;

const Header = styled(Card)`
  grid-column: 1 / -1;
`;

const Footer = styled(Card)`
  grid-column: 1 / -1;
`;
