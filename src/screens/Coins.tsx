import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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

const CoinsList = styled.ul``;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.colors.accentColor};
`;

const Coin = styled.li`
  font-size: 18px;
  font-weight: 600;
  background-color: white;
  color: ${(props) => props.theme.colors.bgColor};
  margin-bottom: 10px;

  border-radius: 15px;
  a {
    padding: 20px;
    display: block;
    transition: color 0.2s ease-in;
  }
  &:hover {
    color: ${(props) => props.theme.colors.accentColor};
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface Coin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinsList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
          </Coin>
        ))}
        {loading ? <Loader>Loading...</Loader> : null}
      </CoinsList>
    </Container>
  );
}

export default Coins;
