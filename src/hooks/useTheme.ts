import { useState } from "react";

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false); // 기본값을 라이트모드로 변경

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return { isDarkMode, toggleTheme };
}
