import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const GlassBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "interactive",
})<{ interactive?: boolean }>(({ theme, interactive }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: theme.spacing(3),

  border: `1px solid ${alpha(
    theme.palette.mode === "dark" ? "#dff9ff" : "#0284c7",
    theme.palette.mode === "dark" ? 0.14 : 0.16,
  )}`,

  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(145deg, rgba(10,24,47,0.82), rgba(6,17,31,0.66))"
      : "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(232,248,255,0.68))",

  backdropFilter: "blur(22px)",

  boxShadow:
    theme.palette.mode === "dark"
      ? "18px 18px 46px rgba(0,0,0,0.32)"
      : "18px 18px 42px rgba(14,116,144,0.13)",

  transition: interactive
    ? "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease"
    : undefined,

  "&:hover": interactive
    ? {
        transform: "translateY(-3px)",
        borderColor: theme.palette.primary.main,
      }
    : undefined,
}));
export default GlassBox;
