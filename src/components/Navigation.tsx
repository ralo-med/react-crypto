import { Link } from "react-router-dom";
import styled from "styled-components";
import { Home, Sun, Moon } from "lucide-react";

const Nav = styled.nav`
  background-color: ${(props) =>
    props.theme.colors.bgColor === "#f8f9fa"
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(0, 0, 0, 0.8)"};
  padding: 15px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid
    ${(props) =>
      props.theme.colors.bgColor === "#f8f9fa"
        ? "rgba(0, 0, 0, 0.1)"
        : "rgba(255, 255, 255, 0.1)"};
`;

const NavContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const HomeButton = styled(Link)`
  background-color: ${(props) =>
    props.theme.colors.bgColor === "#f8f9fa"
      ? "rgba(0, 0, 0, 0.1)"
      : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => props.theme.colors.text};
  padding: 10px;
  border-radius: 50%;
  font-size: 18px;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${(props) =>
      props.theme.colors.bgColor === "#f8f9fa"
        ? "rgba(0, 0, 0, 0.2)"
        : "rgba(255, 255, 255, 0.2)"};

  &:hover {
    background-color: ${(props) =>
      props.theme.colors.bgColor === "#f8f9fa"
        ? "rgba(0, 0, 0, 0.2)"
        : "rgba(255, 255, 255, 0.2)"};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ThemeToggle = styled.button`
  background-color: ${(props) =>
    props.theme.colors.bgColor === "#f8f9fa"
      ? "rgba(0, 0, 0, 0.1)"
      : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => props.theme.colors.text};
  padding: 10px;
  border-radius: 50%;
  font-size: 18px;
  transition: all 0.2s ease;
  border: 1px solid
    ${(props) =>
      props.theme.colors.bgColor === "#f8f9fa"
        ? "rgba(0, 0, 0, 0.2)"
        : "rgba(255, 255, 255, 0.2)"};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) =>
      props.theme.colors.bgColor === "#f8f9fa"
        ? "rgba(0, 0, 0, 0.2)"
        : "rgba(255, 255, 255, 0.2)"};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

function Navigation({
  isDarkMode,
  toggleTheme,
}: {
  isDarkMode: boolean;
  toggleTheme: () => void;
}) {
  return (
    <Nav>
      <NavContainer>
        <HomeButton to="/">
          <Home size={20} />
        </HomeButton>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </ThemeToggle>
      </NavContainer>
    </Nav>
  );
}

export default Navigation;
