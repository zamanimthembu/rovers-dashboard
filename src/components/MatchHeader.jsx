import { Paper, Typography, Box } from "@mui/material";

export default function MatchHeader({ title, subtitle }) {
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
      <Typography variant="h4">{title}</Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
        {subtitle}
      </Typography>
    </Paper>
  );
}
