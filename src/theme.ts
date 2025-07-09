import "styled-components";

export const lightTheme = {
  colors: {
    bgColor: "#f8f9fa",
    text: "#2f3640",
    accentColor: "#4cd137",
  },
};

export const darkTheme = {
  colors: {
    bgColor: "#2f3640",
    text: "#f5f6fa",
    accentColor: "#4cd137",
  },
};

export const theme = darkTheme; // 기본값

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgColor: string;
      text: string;
      accentColor: string;
    };
  }
}
