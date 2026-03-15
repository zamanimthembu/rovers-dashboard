import { useMemo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Chip,
} from "@mui/material";

import MatchHeader from "./components/MatchHeader";
import PlayersTable from "./components/PlayersTable";
import PlayerDetails from "./components/PlayerDetails";
import TeamKpis from "./components/TeamKpis";

import roversData from "./data/rovers_vc_game1_clean.json";

// Recharts
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* ---------- KPI TILE ---------- */
function StatCard({ title, value, subtitle, tone = "primary" }) {
  return (
    <Paper elevation={2} sx={{ p: 2.5, borderLeft: `6px solid`, borderColor: `${tone}.main` }}>
      <Typography variant="overline" color="text.secondary">
        {title}
      </Typography>

      <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 700 }}>
        {value}
      </Typography>

      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Paper>
  );
}

/* ---------- APP ---------- */
export default function App() {
  const [posFilter, setPosFilter] = useState("ALL");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedKpi, setSelectedKpi] = useState(null);

  /* ---------- PLAYERS ---------- */
  const playersAll = useMemo(
    () => (roversData.player_stats || []).filter((p) => p?.name),
    []
  );

  const players = useMemo(() => {
    let result = playersAll;

    if (posFilter === "FORWARDS") result = result.filter((p) => p.pos <= 8);
    if (posFilter === "BACKS") result = result.filter((p) => p.pos >= 9);

    if (selectedKpi) {
      result = result.filter((p) => p.kpis?.[selectedKpi]);
    }

    return result;
  }, [playersAll, posFilter, selectedKpi]);

  /* ---------- KPI CALCS ---------- */
  const kpiScoreTotal = useMemo(
    () => players.reduce((sum, p) => sum + (p.kpi_score ?? 0), 0),
    [players]
  );

  const avgPerfPct = useMemo(() => {
    const vals = players.map((p) => p.perfomance_pct).filter(Number.isFinite);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  }, [players]);

  /* ---------- TEAM KPI CHART DATA ---------- */
  const teamChartData = useMemo(() => {
    const toPct = (v) => {
      if (typeof v === "number") return v;
      const m = String(v).match(/(\d+)%/g);
      return m ? Number(m[m.length - 1].replace("%", "")) : 0;
    };

    return (roversData.team_kpis || []).map((k) => ({
      name: k.label,
      target: toPct(k.target),
      actual: toPct(k.value),
    }));
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <MatchHeader title="College Rovers – Match Dashboard" subtitle="vs VC • Game 1" />

      {/* FILTER BAR */}
      <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Filters
          </Typography>

          {selectedKpi && (
            <Chip
              label={`KPI: ${selectedKpi}`}
              color="primary"
              onDelete={() => setSelectedKpi(null)}
            />
          )}

          <ToggleButtonGroup
            value={posFilter}
            exclusive
            onChange={(_, v) => v && setPosFilter(v)}
            size="small"
            sx={{ ml: "auto" }}
          >
            <ToggleButton value="ALL">All</ToggleButton>
            <ToggleButton value="FORWARDS">Forwards</ToggleButton>
            <ToggleButton value="BACKS">Backs</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Paper>

      {/* KPI TILES */}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={3}>
          <StatCard title="Players in view" value={players.length} tone="info" />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard title="Total KPI Score" value={kpiScoreTotal} tone="success" />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Avg Performance"
            value={`${Math.round(avgPerfPct * 100)}%`}
            tone="primary"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Selected Player"
            value={selectedPlayer?.name || "—"}
            subtitle={selectedPlayer ? `Pos ${selectedPlayer.pos}` : "Click table row"}
            tone="warning"
          />
        </Grid>
      </Grid>

      {/* DASHBOARD GRID */}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {/* BAR CHART */}
        <Grid item xs={12} md={7}>
          <Paper elevation={2} sx={{ p: 2, height: 380 }}>
            <Typography variant="h6" fontWeight={700}>
              Team KPIs – Target vs Actual
            </Typography>
            <Divider sx={{ my: 1.5 }} />

            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={teamChartData} barCategoryGap={16}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip />

                <Bar dataKey="target" fill="#90caf9" radius={[6, 6, 0, 0]} />
                <Bar
                  dataKey="actual"
                  fill="#1976d2"
                  radius={[6, 6, 0, 0]}
                  onClick={(d) => setSelectedKpi(d.name)}
                />
              </BarChart>
            </ResponsiveContainer>

            <Typography variant="caption" color="text.secondary">
              Click bars to cross-filter players (Tableau behaviour)
            </Typography>
          </Paper>
        </Grid>

        {/* PLAYER DETAILS */}
        <Grid item xs={12} md={5}>
          <Paper elevation={2} sx={{ p: 2, height: 380, overflow: "auto" }}>
            <Typography variant="h6" fontWeight={700}>
              Player Details
            </Typography>
            <Divider sx={{ my: 1.5 }} />
            <PlayerDetails
              player={selectedPlayer}
              onClearSelection={() => setSelectedPlayer(null)}
            />
          </Paper>
        </Grid>

        {/* TABLE */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <PlayersTable
              players={players}
              selectedPos={selectedPlayer?.pos}
              onSelectPlayer={setSelectedPlayer}
            />
          </Paper>
        </Grid>

        {/* RAW KPI LIST */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <TeamKpis teamKpis={roversData.team_kpis} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
