import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";
import AppIcon_component from "./AppIcon.component";
import { useAppStore } from "store/slices";
import type { RoleEnum } from "typescript/enums";
import { roleAccent, roles } from "data";
import { useNavigate } from "react-router";
import { useNotifications } from "hooks";
export const TopBar_component = ({
  onMenu,
  showMenu,
}: {
  onMenu: () => void;
  showMenu: boolean;
}) => {
  const {
    appState: { role, mode },
    setRole,
    toggleMode,
  } = useAppStore();
  const accent = roleAccent[role];
  const { data: notifications = [] } = useNotifications();
  const Navigate = useNavigate();
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "transparent",
        color: "text.primary",
        backdropFilter: "blur(18px)",
        borderBottom: (theme) =>
          `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 72, md: 82 }, gap: 1.5 }}>
        {showMenu ? (
          <IconButton aria-label="Open navigation" onClick={onMenu}>
            {/* <MenuRounded /> ci:menu-alt-05*/}
            <AppIcon_component icon="ci:menu-alt-05" width={28} height={28} />
          </IconButton>
        ) : null}
        <TextField
          placeholder="Search patients, staff, reports"
          aria-label="Global search"
          sx={{ display: { xs: "none", md: "block" }, maxWidth: 420, flex: 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AppIcon_component
                    icon="material-symbols:search-rounded"
                    width={20}
                    height={20}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
        <Box sx={{ flex: 1 }} />
        <TextField
          select
          label="Role"
          value={role}
          onChange={(event) => setRole(event.target.value as RoleEnum)}
          sx={{ minWidth: { xs: 138, sm: 190 } }}
        >
          {roles.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <Tooltip
          title={
            mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          <IconButton aria-label="Toggle color mode" onClick={toggleMode}>
            <AppIcon_component
              icon={
                mode === "dark"
                  ? "material-symbols:light-mode-rounded"
                  : "material-symbols:dark-mode-rounded"
              }
              width={24}
              height={24}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notification center">
          <IconButton
            aria-label="Open notifications"
            onClick={() => Navigate("/notifications")}
          >
            <Badge color="error" badgeContent={notifications.length}>
              <AppIcon_component
                icon="material-symbols:notifications"
                width={24}
                height={24}
              />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Profile">
          <IconButton
            aria-label="Open profile"
            onClick={() => Navigate("/profile")}
            sx={{ p: 0.5 }}
          >
            <Avatar
              sx={{
                width: 38,
                height: 38,
                background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                fontWeight: 900,
              }}
            >
              {role.slice(0, 1)}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar_component;
