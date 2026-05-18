import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import MenuIcon from "@mui/icons-material/Menu";

const SIDEBAR_WIDTH = 232;

const NAV_ITEMS = [
  { id: "overview",   label: "Overview",        icon: <DashboardIcon fontSize="small" /> },
  { id: "squad",      label: "Squad",           icon: <GroupIcon fontSize="small" /> },
  { id: "standards",  label: "Team Standards",  icon: <TrackChangesIcon fontSize="small" /> },
];

function SidebarContent({ activeTab, onTabChange }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Branding */}
      <Box sx={{ px: 2.5, pt: 3, pb: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1.5,
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: "0.8rem", lineHeight: 1 }}>
              CR
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#f7f9fc",
                fontWeight: 800,
                fontSize: "0.9rem",
                lineHeight: 1.1,
                letterSpacing: 0.2,
              }}
            >
              College Rovers
            </Typography>
            <Typography
              sx={{
                color: "#5a7aaa",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: 0.8,
                textTransform: "uppercase",
              }}
            >
              Performance Analytics
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

      {/* Nav */}
      <List sx={{ px: 1.25, pt: 1.5, flexGrow: 1 }} disablePadding>
        {NAV_ITEMS.map((item) => {
          const active = activeTab === item.id;
          return (
            <ListItemButton
              key={item.id}
              onClick={() => onTabChange(item.id)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                px: 1.5,
                py: 1,
                backgroundColor: active ? "rgba(198, 40, 40, 0.14)" : "transparent",
                "&:hover": {
                  backgroundColor: active
                    ? "rgba(198, 40, 40, 0.2)"
                    : "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 32,
                  color: active ? "primary.main" : "#5a7aaa",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: active ? 700 : 500,
                  color: active ? "#f7f9fc" : "#8baacf",
                }}
              />
              {active && (
                <Box
                  sx={{
                    width: 3,
                    height: 20,
                    borderRadius: 999,
                    bgcolor: "primary.main",
                    ml: 1,
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

      {/* Footer */}
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography sx={{ fontSize: "0.65rem", color: "#3d5a80", letterSpacing: 0.4 }}>
          INF4017W · UCT IS · 2026
        </Typography>
      </Box>
    </Box>
  );
}

export default function AppShell({ activeTab, onTabChange, matches, selectedMatchId, onMatchChange, children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectedMatch = matches.find((m) => m.id === selectedMatchId);

  const drawerSx = {
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: SIDEBAR_WIDTH,
      boxSizing: "border-box",
      bgcolor: "#080f1e",
      borderRight: "1px solid rgba(255,255,255,0.06)",
    },
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar — desktop */}
      {!isMobile && (
        <Drawer variant="permanent" sx={drawerSx}>
          <SidebarContent activeTab={activeTab} onTabChange={onTabChange} />
        </Drawer>
      )}

      {/* Sidebar — mobile drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={drawerSx}
        >
          <SidebarContent
            activeTab={activeTab}
            onTabChange={(tab) => { onTabChange(tab); setMobileOpen(false); }}
          />
        </Drawer>
      )}

      {/* Main */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: "#080f1e",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            zIndex: (t) => t.zIndex.drawer - 1,
          }}
        >
          <Toolbar sx={{ gap: 2, minHeight: "56px !important", px: { xs: 2, md: 3 } }}>
            {isMobile && (
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{ color: "#8baacf", mr: 0.5 }}
                size="small"
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#f7f9fc", flexGrow: 1, letterSpacing: -0.2 }}
            >
              {NAV_ITEMS.find((n) => n.id === activeTab)?.label}
            </Typography>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <Select
                value={selectedMatchId}
                onChange={(e) => onMatchChange(e.target.value)}
                displayEmpty
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#f7f9fc",
                  bgcolor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "& .MuiSvgIcon-root": { color: "#8baacf" },
                }}
              >
                {matches.map((m) => (
                  <MenuItem key={m.id} value={m.id} sx={{ fontSize: "0.85rem" }}>
                    {m.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>

        {/* Page content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            bgcolor: "background.default",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
