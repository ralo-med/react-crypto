import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import { Outlet } from "react-router-dom";
import { lightTheme, darkTheme } from "./theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTheme } from "./hooks/useTheme";
import Navigation from "./components/Navigation";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: ${(props) => props.theme.colors.bgColor};
    color: ${(props) => props.theme.colors.text};
    font-family: 'Source Sans Pro', sans-serif;
  }

  #root {
    height: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

function Root() {
  const { isDarkMode, toggleTheme } = useTheme();
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Outlet />
      <ReactQueryDevtools initialIsOpen={true} />
    </StyledThemeProvider>
  );
}

export default Root;
