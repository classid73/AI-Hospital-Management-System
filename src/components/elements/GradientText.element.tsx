import { Typography } from "@mui/material";
import { roleAccent } from "data";
import { useAppStore } from "store/slices";
import type { IReactNode } from "typescript/interfaces";

export const GradientText_Element = ({ children }: IReactNode) => {
  const {
    appState: { role },
  } = useAppStore();
  const accent = roleAccent[role];

  return (
    <Typography
      component="span"
      sx={{
        background: `linear-gradient(120deg, ${accent.from}, ${accent.to})`,
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </Typography>
  );
};

export default GradientText_Element;
