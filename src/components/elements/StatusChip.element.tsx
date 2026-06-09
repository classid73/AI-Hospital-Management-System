import { alpha, Chip } from "@mui/material";
import { statusTone } from "data";
import type { StatusEnum } from "typescript/enums";
import type { TColorProps } from "typescript/types";

interface StatusChipProps {
  value: StatusEnum;
}

export const StatusChip_Element = ({ value }: StatusChipProps) => {
  const color = statusTone[value] ?? "default";

  return (
    <Chip
      size="small"
      label={value}
      color={color as TColorProps}
      variant="outlined"
      sx={{ bgcolor: (theme) => alpha(theme.palette.background.paper, 0.42) }}
    />
  );
};

export default StatusChip_Element;
