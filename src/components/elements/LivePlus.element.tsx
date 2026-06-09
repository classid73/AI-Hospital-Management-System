import { alpha, Box, Chip } from "@mui/material";
import { motion } from "framer-motion";
export const LivePlus_element = ({ label = "Live" }: { label?: string }) => {
  return (
    <Chip
      size="small"
      label={label}
      icon={
        <Box
          component={motion.span}
          aria-hidden="true"
          animate={{ scale: [1, 1.55, 1], opacity: [0.9, 0.35, 0.9] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "success.main",
            ml: 1,
          }}
        />
      }
      sx={{
        border: "1px solid",
        borderColor: "success.main",
        bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
      }}
    />
  );
};

export default LivePlus_element;
