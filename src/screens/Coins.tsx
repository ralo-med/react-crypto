import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

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

const CoinsList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.colors.accentColor};
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Coin = styled.li`
  font-size: 18px;
  font-weight: 600;
  background-color: white;
  color: ${(props) => props.theme.colors.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  width: 100%;

  a {
    padding: 20px;
    display: flex;
    align-items: center;
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
  const { isLoading, data } = useQuery({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinsList>
        {data?.slice(0, 100).map((coin: Coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`}>
              <Img
                src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                alt={coin.symbol}
              />
              {coin.name} &rarr;
            </Link>
          </Coin>
        ))}
        {isLoading ? <Loader>Loading...</Loader> : null}
      </CoinsList>
    </Container>
  );
}

export default Coins;
