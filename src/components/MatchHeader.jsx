import { Paper, Typography, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function MatchHeader({ title, matches, selectedMatchId, onMatchChange }) {
  return (
    <Paper sx={{ p: 3, position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 8,
          bgcolor: "primary.main",
        }}
      />
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
            Performance Analytics Dashboard
          </Typography>
        </Box>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="match-select-label">Match</InputLabel>
          <Select
            labelId="match-select-label"
            value={selectedMatchId}
            label="Match"
            onChange={(e) => onMatchChange(e.target.value)}
          >
            {matches.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}
