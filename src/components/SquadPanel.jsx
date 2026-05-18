import { useState } from "react";
import { Box, Grid, Paper, Typography, Divider } from "@mui/material";
import PlayersTable from "./PlayersTable";
import PlayerDetails from "./PlayerDetails";

export default function SquadPanel({ players, posFilter, onPosFilterChange }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <Grid container spacing={2} sx={{ alignItems: "flex-start" }}>
      {/* Table — left */}
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
            onSelectPlayer={(p) => setSelectedPlayer((prev) => prev?.pos === p.pos ? null : p)}
          />
        </Paper>
      </Grid>

      {/* Player details — right */}
      <Grid item xs={12} lg={5}>
        <Paper
          elevation={0}
          sx={{
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 2.5,
            bgcolor: "#0d1830",
            p: 2.5,
            position: { lg: "sticky" },
            top: { lg: 72 },
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#f7f9fc", mb: 0.5 }}>
            Player Review
          </Typography>
          <Typography sx={{ fontSize: "0.78rem", color: "#5a7aaa", mb: 1.5 }}>
            Select a player from the table to open their performance review.
          </Typography>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2 }} />
          <PlayerDetails
            player={selectedPlayer}
            onClearSelection={() => setSelectedPlayer(null)}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
