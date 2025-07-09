import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { useState } from "react";
import styled from "styled-components";
import type { ApexOptions } from "apexcharts";
import { useTheme } from "../hooks/useTheme";

const ChartSelect = styled.select`
  background-color: ${(props) =>
    props.theme.colors.bgColor === "#f8f9fa"
      ? "rgba(0, 0, 0, 0.1)"
      : "rgba(0, 0, 0, 0.5)"};
  color: ${(props) => props.theme.colors.text};
  border: 1px solid
    ${(props) =>
      props.theme.colors.bgColor === "#f8f9fa"
        ? "rgba(0, 0, 0, 0.2)"
        : "rgba(255, 255, 255, 0.2)"};
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 20px;
  cursor: pointer;
  margin-left: auto;
  display: block;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.accentColor};
  }
`;

const ChartContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const [chartType, setChartType] = useState<"line" | "candlestick">("line");
  const { coinId } = useParams();
  const { isDarkMode } = useTheme();
  const { isLoading, data, error } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId!),
    retry: false, // 재시도 비활성화
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 비활성화
  });

  // 차트 타입이 변경될 때 강제 리렌더링을 위한 키
  const chartKey = `${coinId}-${chartType}`;

  const getChartData = () => {
    // 데이터 유효성 검사 강화
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    if (chartType === "line") {
      return [
        {
          name: "Price",
          data: data.map((price) => {
            const value = parseFloat(price.close);
            return {
              x: new Date(price.time_open * 1000).getTime(),
              y: isNaN(value) ? 0 : value,
            };
          }),
        },
      ];
    } else {
      return [
        {
          name: "OHLC",
          data: data.map((price) => {
            const open = parseFloat(price.open);
            const high = parseFloat(price.high);
            const low = parseFloat(price.low);
            const close = parseFloat(price.close);

            return {
              x: new Date(price.time_open * 1000).getTime(),
              y: [
                isNaN(open) ? 0 : open,
                isNaN(high) ? 0 : high,
                isNaN(low) ? 0 : low,
                isNaN(close) ? 0 : close,
              ],
            };
          }),
        },
      ];
    }
  };

  const getChartOptions = (): ApexOptions => {
    const baseOptions: ApexOptions = {
      theme: { mode: isDarkMode ? "dark" : "light" },
      chart: {
        height: 400,
        width: "100%",
        toolbar: {
          show: false,
        },
        background: "transparent",
      },
      xaxis: {
        type: "datetime",
        labels: {
          format: "MM/dd",
          style: {
            fontSize: "10px",
            colors: isDarkMode ? "#f5f6fa" : "#2f3640",
          },
        },
      },
      yaxis: {
        show: false,
      },
      colors: ["#4cd137"],
      grid: {
        show: false,
      },
      tooltip: {
        theme: isDarkMode ? "dark" : "light",
      },
    };

    if (chartType === "line") {
      return {
        ...baseOptions,
        stroke: {
          curve: "smooth" as const,
          width: 4,
        },
        fill: {
          type: "gradient",
          gradient: {
            gradientToColors: ["#0be881"],
          },
        },
      };
    } else {
      return {
        ...baseOptions,
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#4cd137",
              downward: "#e74c3c",
            },
          },
        },
      };
    }
  };

  // 데이터가 로드되지 않았거나 비어있으면 로딩 표시
  if (isLoading) {
    return (
      <ChartContainer>
        <ChartSelect
          value={chartType}
          onChange={(e) =>
            setChartType(e.target.value as "line" | "candlestick")
          }
        >
          <option value="line">Line Chart</option>
          <option value="candlestick">Candlestick Chart</option>
        </ChartSelect>
        <div style={{ textAlign: "center", padding: "20px" }}>
          Loading chart...
        </div>
      </ChartContainer>
    );
  }

  // 에러가 있거나 데이터가 없는 경우
  if (error || !data || !Array.isArray(data) || data.length === 0) {
    return (
      <ChartContainer>
        <ChartSelect
          value={chartType}
          onChange={(e) =>
            setChartType(e.target.value as "line" | "candlestick")
          }
        >
          <option value="line">Line Chart</option>
          <option value="candlestick">Candlestick Chart</option>
        </ChartSelect>
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#e74c3c",
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "rgba(231, 76, 60, 0.1)",
            borderRadius: "10px",
            border: "2px solid #e74c3c",
          }}
        >
          차트 데이터가 없습니다.
        </div>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartSelect
        value={chartType}
        onChange={(e) => setChartType(e.target.value as "line" | "candlestick")}
      >
        <option value="line">Line Chart</option>
        <option value="candlestick">Candlestick Chart</option>
      </ChartSelect>

      {getChartData().length > 0 ? (
        <ApexCharts
          key={chartKey}
          type={chartType}
          series={getChartData()}
          options={getChartOptions()}
        />
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          No chart data available
        </div>
      )}
    </ChartContainer>
  );
}

export default Chart;
