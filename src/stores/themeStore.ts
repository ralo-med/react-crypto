import { atom } from "jotai";

// 다크모드 상태를 관리하는 원자
export const isDarkModeAtom = atom(false);

// 테마 토글 함수를 제공하는 파생 원자
export const toggleThemeAtom = atom(null, (get, set) => {
  const current = get(isDarkModeAtom);
  set(isDarkModeAtom, !current);
});
