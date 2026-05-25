import { useState } from "react";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayersTable from "./PlayersTable";
import PlayerDetails from "./PlayerDetails";

export default function SquadPanel({ players, posFilter, onPosFilterChange }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleSelect = (p) =>
    setSelectedPlayer((prev) => (prev?.pos === p.pos ? null : p));

  const handleClear = () => setSelectedPlayer(null);

  return (
    <>
      {/* Full-width table — drawer handles all player detail display */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
      </Grid>

      {/* Player detail drawer — all screen sizes */}
      <Drawer
        anchor="right"
        open={!!selectedPlayer}
        onClose={handleClear}
        PaperProps={{
          sx: {
            width: { xs: "100vw", sm: 500 },
            bgcolor: "#0b1629",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 2,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
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

        {/* Scrollable content */}
        <Box sx={{ p: 2.5, overflowY: "auto", flex: 1 }}>
          <PlayerDetails player={selectedPlayer} onClearSelection={handleClear} />
        </Box>
      </Drawer>
    </>
  );
}
