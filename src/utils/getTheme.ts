import type { themeTypes } from "../App";

export const getTheme = (): themeTypes | undefined  => {
    // @ts-expect-error
    const theme: themeTypes = localStorage.getItem("theme");
    if(theme) return theme
}