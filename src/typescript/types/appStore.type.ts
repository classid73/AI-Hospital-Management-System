import type { PaletteMode } from "@mui/material/styles";
import type { RoleEnum } from "typescript/enums";

export type AppStateProps = {
  role: RoleEnum;
  mode: PaletteMode;
};
