import { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayersTable from "./PlayersTable";
import PlayerDetails from "./PlayerDetails";

export default function SquadPanel({ players, posFilter, onPosFilterChange }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const handleSelect = (p) =>
    setSelectedPlayer((prev) => (prev?.pos === p.pos ? null : p));

  const handleClear = () => setSelectedPlayer(null);

  const detailSubtitle = selectedPlayer
    ? `Reviewing ${selectedPlayer.name} · Position ${selectedPlayer.pos}`
    : "Select a player from the table to open their performance review.";

  return (
    <>
      <Grid container spacing={2} sx={{ alignItems: "flex-start" }}>
        {/* Players table — full width on mobile, left column on desktop */}
        <Grid item xs={12} lg={7}>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 2.5,
              bgcolor: "#0d1830",
              p: 2.5,
            }}
          >
            <PlayersTable
              players={players}
              posFilter={posFilter}
              onPosFilterChange={onPosFilterChange}
              selectedPos={selectedPlayer?.pos}
              onSelectPlayer={handleSelect}
            />
          </Paper>
        </Grid>

        {/* Sticky detail panel — desktop only (lg+) */}
        <Grid item xs={12} lg={5} sx={{ display: { xs: "none", lg: "block" } }}>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 2.5,
              bgcolor: "#0d1830",
              p: 2.5,
              position: "sticky",
              top: 72,
              maxHeight: "calc(100vh - 88px)",
              overflowY: "auto",
              "&::-webkit-scrollbar": { width: 5 },
              "&::-webkit-scrollbar-track": { background: "transparent" },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(255,255,255,0.1)",
                borderRadius: 99,
              },
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#f7f9fc", mb: 0.5 }}
            >
              Player Review
            </Typography>
            <Typography sx={{ fontSize: "0.78rem", color: "#5a7aaa", mb: 1.5 }}>
              {detailSubtitle}
            </Typography>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2 }} />
            <PlayerDetails player={selectedPlayer} onClearSelection={handleClear} />
          </Paper>
        </Grid>
      </Grid>

      {/* Mobile / tablet: slide-in drawer (xs → md) */}
      <Drawer
        anchor="right"
        open={!isDesktop && !!selectedPlayer}
        onClose={handleClear}
        PaperProps={{
          sx: {
            width: { xs: "100vw", sm: 460 },
            bgcolor: "#0b1629",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Drawer header — sticky within drawer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 2,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            bgcolor: "#0b1629",
            flexShrink: 0,
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#f7f9fc" }}
            >
              Player Review
            </Typography>
            {selectedPlayer && (
              <Typography sx={{ fontSize: "0.78rem", color: "#5a7aaa", mt: 0.25 }}>
                {selectedPlayer.name} · Position {selectedPlayer.pos}
              </Typography>
            )}
          </Box>
          <IconButton
            onClick={handleClear}
            size="small"
            aria-label="Close player review"
            sx={{
              color: "rgba(255,255,255,0.55)",
              "&:hover": {
                color: "#f7f9fc",
                bgcolor: "rgba(255,255,255,0.06)",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Drawer scrollable content */}
        <Box sx={{ p: 2.5, overflowY: "auto", flex: 1 }}>
          <PlayerDetails player={selectedPlayer} onClearSelection={handleClear} />
        </Box>
      </Drawer>
    </>
  );
}
