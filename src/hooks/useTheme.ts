import { useAtomValue, useSetAtom } from "jotai";
import { darkModeAtom, toggleDarkModeAtom } from "../stores/themeStore";

export function useTheme() {
  const isDarkMode = useAtomValue(darkModeAtom);
  const toggleTheme = useSetAtom(toggleDarkModeAtom);

  return {
    isDarkMode,
    toggleTheme,
  };
}
