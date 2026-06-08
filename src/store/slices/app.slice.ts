import type { PaletteMode } from "@mui/material/styles";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector, type RootState } from "store";
import { RoleEnum } from "typescript/enums";
import type { AppStateProps } from "typescript/types";

const initialState: AppStateProps = {
  role: RoleEnum.USER,
  mode: "light",
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRole: (state: AppStateProps, action: PayloadAction<RoleEnum>) => {
      state.role = action.payload;
    },
    setMode: (state: AppStateProps, action: PayloadAction<PaletteMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setRole, setMode } = appSlice.actions;
export const appSelector = (appSiteState: RootState): AppStateProps =>
  appSiteState.app;

export const useAppStore = () => {
  const dispatch = useAppDispatch();
  return {
    appState: useAppSelector(appSelector),
    setRole: (role: RoleEnum) => dispatch(setRole(role)),
    setMode: (mode: PaletteMode) => dispatch(setMode(mode)),
  };
};
