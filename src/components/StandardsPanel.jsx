import { Paper, Typography, Box } from "@mui/material";
import TeamKpis from "./TeamKpis";

export default function StandardsPanel({ teamKpis }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 2.5,
        bgcolor: "#0d1830",
      }}
    >
      <Box sx={{ mb: 2.5 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#f7f9fc" }}>
          Team Standards Review
        </Typography>
        <Typography sx={{ fontSize: "0.78rem", color: "#5a7aaa", mt: 0.25 }}>
          Each standard shows target, actual output, and whether the team hit the coaching benchmark.
        </Typography>
      </Box>
      <TeamKpis teamKpis={teamKpis} />
    </Paper>
  );
}
