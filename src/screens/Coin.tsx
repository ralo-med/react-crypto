import { useParams, Link, Outlet, useMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useState } from "react";

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.theme.colors.bgColor === "#f8f9fa"
      ? "rgba(0, 0, 0, 0.1)"
      : "rgba(0, 0, 0, 0.5)"};
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.theme.colors.bgColor === "#f8f9fa"
        ? "rgba(0, 0, 0, 0.1)"
        : "rgba(255, 255, 255, 0.1)"};
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 8px;
    color: ${(props) => props.theme.colors.text};
  }

  span:last-child {
    font-size: 16px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.accentColor};
  }
`;

const DescriptionContainer = styled.div`
  margin: 20px 0px;
`;

const DescriptionText = styled.p<{ $isExpanded: boolean }>`
  line-height: 1.8;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  text-align: justify;
  margin: 0;
  ${(props) =>
    !props.$isExpanded &&
    `
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.accentColor};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  padding: 5px 0;
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }
`;

export interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) =>
    props.theme.colors.bgColor === "#f8f9fa"
      ? "rgba(0, 0, 0, 0.1)"
      : "rgba(0, 0, 0, 0.5)"};
  border-radius: 10px;
  color: ${(props) =>
    props.$isActive ? props.theme.colors.accentColor : props.theme.colors.text};
  a {
    display: block;
    transition: color 0.2s ease-in;
    color: inherit;
    text-decoration: none;
    padding: 10px 0px;
  }
  &:hover {
    color: ${(props) => props.theme.colors.accentColor};
  }
`;

const Separator = styled.div`
  height: 1px;
  background-color: ${(props) =>
    props.theme.colors.bgColor === "#f8f9fa"
      ? "rgba(0, 0, 0, 0.2)"
      : "rgba(255, 255, 255, 0.2)"};
  margin: 20px 0px;
`;

function Coin() {
  const { coinId } = useParams();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoinInfo(coinId as string),
  });
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>({
    queryKey: ["price", coinId],
    queryFn: () => fetchCoinPrice(coinId as string),
  });

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <Container>
      <Helmet>
        <title>{infoData?.name || coinId}</title>
      </Helmet>
      <Header>
        <Title>{infoData?.name || "Loading..."}</Title>
      </Header>
      {infoLoading || priceLoading ? null : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${priceData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <DescriptionContainer>
            <DescriptionText $isExpanded={isDescriptionExpanded}>
              {infoData?.description}
            </DescriptionText>
            {infoData?.description && infoData.description.length > 200 && (
              <ReadMoreButton onClick={toggleDescription}>
                {isDescriptionExpanded ? "Read less" : "Read more"}
              </ReadMoreButton>
            )}
          </DescriptionContainer>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{priceData?.total_supply.toLocaleString()}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply.toLocaleString()}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab $isActive={priceMatch !== null}>
              <Link to={`price`}>Price</Link>
            </Tab>
            <Tab $isActive={chartMatch !== null}>
              <Link to={`chart`}>Chart</Link>
            </Tab>
          </Tabs>
          <Separator />
          <Outlet />
        </>
      )}
    </Container>
  );
}

export default Coin;
