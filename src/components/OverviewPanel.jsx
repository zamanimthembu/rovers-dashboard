import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";

/* ── Stat card ─────────────────────────────────────────── */
function StatCard({ label, value, sub, trend, accent }) {
  const TrendIcon =
    trend === "up" ? TrendingUpIcon : trend === "down" ? TrendingDownIcon : RemoveIcon;
  const trendColor =
    trend === "up" ? "#2eaf4a" : trend === "down" ? "#d92d20" : "#8baacf";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        height: "100%",
        border: "1px solid rgba(255,255,255,0.07)",
        borderTop: `3px solid ${accent}`,
        borderRadius: 2.5,
        bgcolor: "#0d1830",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      <Typography
        sx={{
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: "#5a7aaa",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{ fontSize: "2rem", fontWeight: 800, color: "#f7f9fc", lineHeight: 1.1 }}
      >
        {value}
      </Typography>

      {sub && (
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.25 }}>
          <TrendIcon sx={{ fontSize: 14, color: trendColor }} />
          <Typography sx={{ fontSize: "0.75rem", color: "#8baacf" }}>{sub}</Typography>
        </Stack>
      )}
    </Paper>
  );
}

/* ── Custom tooltip ─────────────────────────────────────── */
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        bgcolor: "#0d1830",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 2,
        px: 1.75,
        py: 1.25,
        boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
      }}
    >
      <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#f7f9fc", mb: 0.5 }}>
        {label}
      </Typography>
      {payload.map((entry) => (
        <Stack key={entry.dataKey} direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: entry.fill }} />
          <Typography sx={{ fontSize: "0.75rem", color: "#a9b8d4" }}>
            {entry.name}: <strong style={{ color: "#f7f9fc" }}>{entry.value}</strong>
          </Typography>
        </Stack>
      ))}
    </Box>
  );
}

/* ── Overview panel ─────────────────────────────────────── */
export default function OverviewPanel({ players, teamKpis, teamChartData }) {
  const totalKpi = players.reduce((s, p) => s + (p.kpi_score ?? 0), 0);

  const perfValues = players.map((p) => p.performance_pct).filter(Number.isFinite);
  const avgPerf = perfValues.length
    ? perfValues.reduce((a, b) => a + b, 0) / perfValues.length
    : 0;

  const excelling = players.filter((p) => Number.isFinite(p.performance_pct) && p.performance_pct >= 1).length;
  const onTarget = (teamKpis || []).filter((k) => {
    const target = parseFloat(String(k.target_raw));
    const actual = parseFloat(String(k.value_raw).match(/-?\d+(\.\d+)?/g)?.slice(-1)[0] ?? "0");
    return Number.isFinite(target) && Number.isFinite(actual) && actual >= target;
  }).length;

  const chartDataWithColors = teamChartData.map((d) => ({
    ...d,
    metTarget: d.actual >= d.target,
  }));

  return (
    <Stack spacing={3}>
      {/* KPI tiles */}
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <StatCard
            label="Squad size"
            value={players.length}
            sub="Players with data"
            trend="neutral"
            accent="#6aa4ff"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard
            label="Total KPI Score"
            value={totalKpi}
            sub="Sum across all players"
            trend="neutral"
            accent="#2eaf4a"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard
            label="Avg Performance"
            value={`${Math.round(avgPerf * 100)}%`}
            sub={`${excelling} players excelling`}
            trend={avgPerf >= 1 ? "up" : avgPerf >= 0.85 ? "neutral" : "down"}
            accent="#f59e0b"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard
            label="Team KPIs On Target"
            value={`${onTarget} / ${(teamKpis || []).length}`}
            sub="Team standards met"
            trend={onTarget >= (teamKpis || []).length * 0.7 ? "up" : "down"}
            accent="#c62828"
          />
        </Grid>
      </Grid>

      {/* Chart */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 2.5,
          bgcolor: "#0d1830",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#f7f9fc" }}>
              Team KPIs — Target vs Actual
            </Typography>
            <Typography sx={{ fontSize: "0.78rem", color: "#5a7aaa", mt: 0.25 }}>
              Standards set by coaching staff for this match
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Stack direction="row" spacing={0.75} alignItems="center">
              <Box sx={{ width: 10, height: 10, borderRadius: 1, bgcolor: "#1e3a6e" }} />
              <Typography sx={{ fontSize: "0.72rem", color: "#8baacf" }}>Target</Typography>
            </Stack>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <Box sx={{ width: 10, height: 10, borderRadius: 1, bgcolor: "#2eaf4a" }} />
              <Typography sx={{ fontSize: "0.72rem", color: "#8baacf" }}>On target</Typography>
            </Stack>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <Box sx={{ width: 10, height: 10, borderRadius: 1, bgcolor: "#c62828" }} />
              <Typography sx={{ fontSize: "0.72rem", color: "#8baacf" }}>Off target</Typography>
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2.5 }} />

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartDataWithColors} barCategoryGap={20} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#5a7aaa" }}
              angle={-35}
              textAnchor="end"
              interval={0}
              height={64}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: "#5a7aaa" }}
              axisLine={false}
              tickLine={false}
              tickCount={6}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="target" name="Target" fill="#1e3a6e" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <Bar dataKey="actual" name="Actual" radius={[4, 4, 0, 0]} maxBarSize={28}>
              {chartDataWithColors.map((entry, i) => (
                <Cell key={i} fill={entry.metTarget ? "#2eaf4a" : "#c62828"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Stack>
  );
}
