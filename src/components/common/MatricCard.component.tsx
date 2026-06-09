import { toneMap } from "data";
import type { MetricCardProps } from "typescript/types";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { GlassSurface_Element } from "components/elements";
import AppIcon_component from "./AppIcon.component";
// import { TrendingUpRounded } from "@mui/icons-material";
export const MatricCard_component = ({
  label,
  value,
  detail,
  icon: Icon,
  tone = "cyan",
  progress,
}: MetricCardProps) => {
  const [from, to] = toneMap[tone];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <GlassSurface_Element
        interactive
        sx={{ p: 2.5, minHeight: 176, position: "relative" }}
      >
        <Stack spacing={2} sx={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 3,
                display: "grid",
                placeItems: "center",
                background: `linear-gradient(135deg, ${from}, ${to})`,
                color: "white",
                boxShadow: `0 16px 32px ${alpha(from, 0.28)}`,
              }}
            >
              <Icon />
            </Box>

            <AppIcon_component icon="eva:trending-up-outline" color={to} />
          </Stack>

          {/* Main value */}
          <Box>
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ fontWeight: 700 }}
            >
              {label}
            </Typography>

            <Typography variant="h4" sx={{ mt: 0.5 }}>
              {value}
            </Typography>
          </Box>

          {/* Detail */}
          <Typography color="text.secondary" variant="body2">
            {detail}
          </Typography>

          {/* Progress */}
          {typeof progress === "number" && (
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 99,
                bgcolor: (theme) => alpha(theme.palette.text.primary, 0.08),
              }}
            />
          )}
        </Stack>

        {/* Glow decoration */}
        <Box
          sx={{
            position: "absolute",
            right: -24,
            bottom: -42,
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${alpha(
              to,
              0.3,
            )}, transparent 68%)`,
            pointerEvents: "none",
          }}
        />
      </GlassSurface_Element>
    </motion.div>
  );
};

export default MatricCard_component;
