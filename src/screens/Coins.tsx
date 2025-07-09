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
  border-radius: 50%;
`;

const FallbackIcon = styled.div`
  width: 35px;
  height: 35px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: #666;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
`;

const Coin = styled.li`
  font-size: 18px;
  font-weight: 600;
  background-color: ${(props) =>
    props.theme.colors.bgColor === "#f8f9fa"
      ? "rgba(0, 0, 0, 0.05)"
      : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 10px;
  border-radius: 15px;
  width: 100%;
  border: 1px solid
    ${(props) =>
      props.theme.colors.bgColor === "#f8f9fa"
        ? "rgba(0, 0, 0, 0.1)"
        : "rgba(255, 255, 255, 0.2)"};
  transition: all 0.2s ease;

  a {
    padding: 20px;
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
  }
  &:hover {
    background-color: ${(props) =>
      props.theme.colors.bgColor === "#f8f9fa"
        ? "rgba(0, 0, 0, 0.1)"
        : "rgba(255, 255, 255, 0.2)"};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Loader = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-size: 48px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
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
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <FallbackIcon style={{ display: "none" }}>
                {coin.symbol.charAt(0).toUpperCase()}
              </FallbackIcon>
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
