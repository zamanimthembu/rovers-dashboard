import { Box, Chip, Grid, LinearProgress, Stack, Typography } from "@mui/material";

function parseNumericValue(rawValue) {
  if (rawValue == null) {
    return null;
  }

  const matches = String(rawValue).match(/-?\d+(\.\d+)?/g);

  if (!matches?.length) {
    return null;
  }

  return Number(matches[matches.length - 1]);
}

function cleanMetricName(metricRaw = "") {
  return metricRaw.replace(/\s*\([^)]*\)\s*$/, "");
}

function isLowerBetter(metricRaw = "") {
  const metric = metricRaw.toLowerCase();
  return (
    metric.includes("conceded") ||
    metric.includes("against") ||
    metric.includes("errors") ||
    metric.includes("cards")
  );
}

function getKpiStatus(metricRaw, targetRaw, valueRaw) {
  const target = parseNumericValue(targetRaw);
  const actual = parseNumericValue(valueRaw);

  if (!Number.isFinite(target) || !Number.isFinite(actual)) {
    return {
      label: "Review",
      tone: "warning",
      accent: "#f59e0b",
      progress: 0,
      summary: "Manual review recommended for this KPI.",
    };
  }

  const lowerBetter = isLowerBetter(metricRaw);
  const ratio = lowerBetter
    ? target === 0
      ? actual === 0
        ? 1
        : 0
      : target / Math.max(actual, 0.01)
    : actual / Math.max(target, 0.01);

  if (ratio >= 1) {
    return {
      label: "On Target",
      tone: "success",
      accent: "#2eaf4a",
      progress: Math.min(ratio * 100, 120),
      summary: lowerBetter
        ? "Team output stayed at or better than the acceptable ceiling."
        : "Team output hit or exceeded the required standard.",
    };
  }

  if (ratio >= 0.85) {
    return {
      label: "Borderline",
      tone: "warning",
      accent: "#f59e0b",
      progress: Math.min(ratio * 100, 100),
      summary: "Close to target, but not yet secure enough for review confidence.",
    };
  }

  return {
    label: "Off Track",
    tone: "error",
    accent: "#d92d20",
    progress: Math.min(ratio * 100, 100),
    summary: lowerBetter
      ? "This KPI moved beyond the acceptable limit and needs immediate attention."
      : "This KPI finished well below the required standard.",
  };
}

export default function TeamKpis({ teamKpis }) {
  const items = (teamKpis || []).map((kpi, idx) => ({
    ...kpi,
    id: `${kpi.metric_raw}-${idx}`,
    name: cleanMetricName(kpi.metric_raw),
    status: getKpiStatus(kpi.metric_raw, kpi.target_raw, kpi.value_raw),
  }));

  const counts = items.reduce(
    (acc, item) => {
      if (item.status.tone === "success") acc.onTarget += 1;
      if (item.status.tone === "warning") acc.borderline += 1;
      if (item.status.tone === "error") acc.offTrack += 1;
      return acc;
    },
    { onTarget: 0, borderline: 0, offTrack: 0 }
  );

  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Box>
          <Typography variant="h6">Team KPI Review</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            A compact coaching view of which team standards were hit, missed, or still
            sitting in the warning zone.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label={`${counts.onTarget} on target`} color="success" />
          <Chip label={`${counts.borderline} borderline`} color="warning" />
          <Chip label={`${counts.offTrack} off track`} color="error" />
        </Stack>
      </Stack>

      <Grid container spacing={1.5}>
        {items.map((kpi) => (
          <Grid item xs={12} md={6} lg={4} key={kpi.id}>
            <Box
              sx={{
                height: "100%",
                p: 1.75,
                borderRadius: 3,
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.015) 100%)",
              }}
            >
              <Stack spacing={1.1}>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box sx={{ pr: 1 }}>
                    <Typography variant="overline">Team Standard</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {kpi.name}
                    </Typography>
                  </Box>

                  <Chip label={kpi.status.label} color={kpi.status.tone} size="small" />
                </Stack>

                <LinearProgress
                  variant="determinate"
                  value={kpi.status.progress}
                  color={kpi.status.tone}
                  sx={{
                    height: 8,
                    borderRadius: 999,
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                  }}
                />

                <Stack direction="row" spacing={2}>
                  <Box sx={{ minWidth: 92 }}>
                    <Typography variant="overline">Target</Typography>
                    <Typography variant="h6">{kpi.target_raw}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline">Actual</Typography>
                    <Typography variant="h6">{kpi.value_raw}</Typography>
                  </Box>
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {kpi.status.summary}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
