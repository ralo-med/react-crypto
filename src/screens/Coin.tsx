import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.colors.accentColor};
`;

function Coin() {
  const { coinId } = useParams();
  return (
    <Container>
      <Header>
        <Title>{coinId}</Title>
      </Header>
    </Container>
  );
}

export default Coin;
