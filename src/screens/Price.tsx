import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinPrice } from "../api";
import styled from "styled-components";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 20px;
`;

const PriceCard = styled.div`
  background-color: ${(props) =>
    props.theme.colors.bgColor === "#f8f9fa"
      ? "rgba(0, 0, 0, 0.1)"
      : "rgba(0, 0, 0, 0.5)"};
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid
    ${(props) =>
      props.theme.colors.bgColor === "#f8f9fa"
        ? "rgba(0, 0, 0, 0.1)"
        : "rgba(255, 255, 255, 0.1)"};
`;

const PriceLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
  color: ${(props) => props.theme.colors.text};
`;

const PriceValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.accentColor};
`;

const ChangeValue = styled.div<{ $isPositive: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => (props.$isPositive ? "#4cd137" : "#e74c3c")};
`;

function Price() {
  const { coinId } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["price", coinId],
    queryFn: () => fetchCoinPrice(coinId!),
  });

  if (isLoading) return <div>Loading price...</div>;

  if (error || !data) {
    return (
      <Container>
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#e74c3c",
          }}
        >
          가격 데이터를 불러올 수 없습니다.
        </div>
      </Container>
    );
  }

  const priceData = data?.quotes?.USD;

  if (!priceData) {
    return (
      <Container>
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#e74c3c",
          }}
        >
          USD 가격 데이터가 없습니다.
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <PriceGrid>
        <PriceCard>
          <PriceLabel>Current Price</PriceLabel>
          <PriceValue>${priceData?.price.toFixed(2)}</PriceValue>
        </PriceCard>

        <PriceCard>
          <PriceLabel>Market Cap</PriceLabel>
          <PriceValue>${priceData?.market_cap.toLocaleString()}</PriceValue>
        </PriceCard>

        <PriceCard>
          <PriceLabel>24h Volume</PriceLabel>
          <ChangeValue $isPositive={true}>
            ${priceData?.volume_24h.toLocaleString()}
          </ChangeValue>
        </PriceCard>

        <PriceCard>
          <PriceLabel>24h Change</PriceLabel>
          <ChangeValue $isPositive={(priceData?.percent_change_24h || 0) > 0}>
            {(priceData?.percent_change_24h || 0).toFixed(2)}%
          </ChangeValue>
        </PriceCard>

        <PriceCard>
          <PriceLabel>7d Change</PriceLabel>
          <ChangeValue $isPositive={(priceData?.percent_change_7d || 0) > 0}>
            {(priceData?.percent_change_7d || 0).toFixed(2)}%
          </ChangeValue>
        </PriceCard>

        <PriceCard>
          <PriceLabel>30d Change</PriceLabel>
          <ChangeValue $isPositive={(priceData?.percent_change_30d || 0) > 0}>
            {(priceData?.percent_change_30d || 0).toFixed(2)}%
          </ChangeValue>
        </PriceCard>
      </PriceGrid>
    </Container>
  );
}

export default Price;
