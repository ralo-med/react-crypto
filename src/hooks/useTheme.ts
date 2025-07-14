import { useAtom } from "jotai";
import { isDarkModeAtom, toggleThemeAtom } from "../stores/themeStore";

export function useTheme() {
  const [isDarkMode] = useAtom(isDarkModeAtom);
  const [, toggleTheme] = useAtom(toggleThemeAtom);

  return {
    isDarkMode,
    toggleTheme,
  };
}
