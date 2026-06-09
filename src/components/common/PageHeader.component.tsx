import { Box, Stack, Typography } from "@mui/material";
import type { IPageHeaderProps } from "typescript/interfaces";

export const PageHeader_component = ({
  kicker,
  title,
  description,
  actions,
}: IPageHeaderProps) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2.5}
      sx={{
        mb: 3,
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "center" },
      }}
    >
      <Box>
        {kicker ? (
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 850,
              letterSpacing: "0.16em",
            }}
          >
            {kicker}
          </Typography>
        ) : null}
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontSize: { xs: 32, md: 44 }, lineHeight: 1.02 }}
        >
          {title}
        </Typography>
        {description ? (
          <Typography
            color="text.secondary"
            sx={{ mt: 1, maxWidth: 780, fontSize: { xs: 15, md: 17 } }}
          >
            {description}
          </Typography>
        ) : null}
      </Box>
      {actions ? (
        <Stack direction="row" spacing={1.25} sx={{ flexWrap: "wrap" }}>
          {actions}
        </Stack>
      ) : null}
    </Stack>
  );
};

export default PageHeader_component;
