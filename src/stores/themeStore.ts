import { atom } from "jotai";

// 다크모드 상태 원자
export const darkModeAtom = atom(true);

// 테마 토글 함수
export const toggleDarkModeAtom = atom(null, (get, set) => {
  const current = get(darkModeAtom);
  set(darkModeAtom, !current);
});
