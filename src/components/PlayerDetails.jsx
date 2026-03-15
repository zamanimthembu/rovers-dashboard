import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

function getPlayerStatus(performancePct) {
  if (!Number.isFinite(performancePct)) {
    return {
      label: "Awaiting Data",
      tone: "warning",
      accent: "#f59e0b",
      summary: "No verified performance score is available for this player yet.",
    };
  }

  if (performancePct >= 1) {
    return {
      label: "Excelling",
      tone: "success",
      accent: "#2eaf4a",
      summary: "This player is meeting or exceeding the KPI target.",
    };
  }

  if (performancePct >= 0.85) {
    return {
      label: "Borderline",
      tone: "warning",
      accent: "#f59e0b",
      summary: "This player is close to target but still needs a lift in the key moments.",
    };
  }

  return {
    label: "Underperforming",
    tone: "error",
    accent: "#d92d20",
    summary: "This player is currently below the expected KPI output for selection standard.",
  };
}

function formatPercent(value) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return `${Math.round(value * 100)}%`;
}

function metricLabel(key) {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function metricValue(value) {
  return value == null ? "-" : value;
}

export default function PlayerDetails({ player, onClearSelection }) {
  if (!player) {
    return (
      <Box
        sx={{
          minHeight: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px dashed rgba(255, 255, 255, 0.12)",
          borderRadius: 3,
          px: 3,
          py: 5,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
        }}
      >
        <Stack spacing={1.25} sx={{ maxWidth: 420, textAlign: "center" }}>
          <Typography variant="overline">Player Review</Typography>
          <Typography variant="h6">Select a player to open the performance review</Typography>
          <Typography variant="body2" color="text.secondary">
            The selected player panel is designed to become the main coaching view for
            target tracking, instant status feedback, and one-on-one conversations.
          </Typography>
        </Stack>
      </Box>
    );
  }

  const performancePct = player.perfomance_pct;
  const status = getPlayerStatus(performancePct);
  const progressValue = Number.isFinite(performancePct)
    ? Math.min(Math.round(performancePct * 100), 120)
    : 0;
  const delta = Number.isFinite(player.kpi_score) && Number.isFinite(player.target)
    ? player.kpi_score - player.target
    : null;
  const primaryMetrics = [
    ["KPI Score", player.kpi_score],
    ["Target", player.target],
    ["Time Played", player.time_play],
    ["Performance", formatPercent(performancePct)],
  ];
  const detailMetrics = Object.entries(player).filter(
    ([key]) =>
      !["pos", "name", "target", "time_play", "kpi_score", "perfomance_pct"].includes(key)
  );

  return (
    <Stack spacing={2.25}>
      <Box
        sx={{
          borderRadius: 3,
          border: "1px solid rgba(255, 255, 255, 0.08)",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
        }}
      >
        <Box
          sx={{
            px: 2.25,
            py: 1.25,
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            background: `linear-gradient(90deg, ${status.accent} 0%, rgba(8, 22, 47, 0.24) 90%)`,
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Box>
              <Typography variant="overline" sx={{ color: "rgba(247, 249, 252, 0.78)" }}>
                Selected Player
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.25 }}>
                {player.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(247, 249, 252, 0.86)" }}>
                Position {player.pos}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label={status.label} color={status.tone} />
              <Button
                variant="outlined"
                size="small"
                onClick={onClearSelection}
                sx={{
                  color: "#f7f9fc",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  backgroundColor: "rgba(8, 22, 47, 0.18)",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.36)",
                    backgroundColor: "rgba(8, 22, 47, 0.32)",
                  },
                }}
              >
                Clear selection
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Stack spacing={1.25} sx={{ px: 2.25, py: 2 }}>
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              spacing={2}
            >
              <Typography variant="overline">Target Attainment</Typography>
              <Typography variant="h4">{formatPercent(performancePct)}</Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={progressValue}
              color={status.tone}
              sx={{
                mt: 1,
                height: 10,
                borderRadius: 999,
                bgcolor: "rgba(255, 255, 255, 0.08)",
              }}
            />

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {status.summary}
            </Typography>
          </Box>

          <Grid container spacing={1.25}>
            {primaryMetrics.map(([label, value]) => (
              <Grid item xs={6} key={label}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    backgroundColor: "rgba(255, 255, 255, 0.025)",
                  }}
                >
                  <Typography variant="overline">{label}</Typography>
                  <Typography variant="h6" sx={{ mt: 0.25 }}>
                    {value ?? "-"}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              p: 1.5,
              borderRadius: 2.5,
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backgroundColor: "rgba(255, 255, 255, 0.025)",
            }}
          >
            <Typography variant="overline">Selection Read</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
              {delta == null
                ? "A target comparison is not available for this player."
                : delta >= 0
                  ? `Up ${delta} KPI points on target. This is selection-positive output.`
                  : `${Math.abs(delta)} KPI points below target. This needs attention in review.`}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="overline">Match Contribution Breakdown</Typography>
        <Grid container spacing={1} sx={{ mt: 0.25 }}>
          {detailMetrics.map(([key, value]) => (
            <Grid item xs={6} sm={4} key={key}>
              <Box
                sx={{
                  p: 1.25,
                  minHeight: 86,
                  borderRadius: 2.5,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                }}
              >
                <Typography variant="overline">{metricLabel(key)}</Typography>
                <Typography variant="h6" sx={{ mt: 0.25 }}>
                  {metricValue(value)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}
