import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  type Theme,
  type ThemeOptions,
} from "@mui/material";
import { useMemo } from "react";
import { useAppStore } from "store/slices";
import type { IThemeProvider } from "typescript/interfaces";

export const ThemeCustomization = ({ children }: IThemeProvider) => {
  const {
    appState: { mode },
  } = useAppStore();
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: {
        mode: mode,
      },
    }),
    [mode],
  );
  const themes: Theme = createTheme(themeOptions);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
