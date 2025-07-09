import "styled-components";

export const theme = {
  colors: {
    bgColor: "#2f3640",
    text: "#f5f6fa",
    accentColor: "#4cd137",
  },
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgColor: string;
      text: string;
      accentColor: string;
    };
  }
}
