import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

function isForward(pos) {
  return pos >= 1 && pos <= 8;
}

function isBack(pos) {
  return pos >= 9 && pos <= 15;
}

function getPerformanceTone(performancePct) {
  if (!Number.isFinite(performancePct)) {
    return {
      label: "No Data",
      color: "warning",
      dot: "#f59e0b",
    };
  }

  if (performancePct >= 1) {
    return {
      label: "Excelling",
      color: "success",
      dot: "#2eaf4a",
    };
  }

  if (performancePct >= 0.85) {
    return {
      label: "Borderline",
      color: "warning",
      dot: "#f59e0b",
    };
  }

  return {
    label: "Below",
    color: "error",
    dot: "#d92d20",
  };
}

function formatPercent(value) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return `${Math.round(value * 100)}%`;
}

export default function PlayersTable({ players, onSelectPlayer, selectedPos }) {
  const [filter, setFilter] = useState("ALL");

  const filteredAndSorted = useMemo(() => {
    const list = (players || []).filter((p) => p?.name);

    const filtered =
      filter === "FORWARDS"
        ? list.filter((p) => isForward(p.pos))
        : filter === "BACKS"
          ? list.filter((p) => isBack(p.pos))
          : list;

    return [...filtered].sort((a, b) => {
      const aPerf = a.perfomance_pct ?? -1;
      const bPerf = b.perfomance_pct ?? -1;
      return bPerf - aPerf;
    });
  }, [players, filter]);

  const top3Positions = new Set(filteredAndSorted.slice(0, 3).map((p) => p.pos));

  return (
    <Box sx={{ mt: 1 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Box>
          <Typography variant="h6">Players</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Showing {filteredAndSorted.length} players, sorted by performance percentage.
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, value) => value && setFilter(value)}
          size="small"
        >
          <ToggleButton value="ALL">All</ToggleButton>
          <ToggleButton value="FORWARDS">Forwards</ToggleButton>
          <ToggleButton value="BACKS">Backs</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <TableContainer
        sx={{
          mt: 2,
          borderRadius: 3,
          border: "1px solid rgba(255, 255, 255, 0.08)",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.012) 100%)",
        }}
      >
        <Table size="small" sx={{ minWidth: 720 }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "rgba(8, 22, 47, 0.74)",
              }}
            >
              {["Pos", "Name", "KPI Score", "Target", "Time", "Perf %", "Status"].map(
                (heading) => (
                  <TableCell
                    key={heading}
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontSize: "0.72rem",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {heading}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredAndSorted.map((player) => {
              const performance = player.perfomance_pct;
              const tone = getPerformanceTone(performance);
              const isSelected = selectedPos === player.pos;
              const isTop3 = top3Positions.has(player.pos);

              return (
                <TableRow
                  hover
                  key={player.pos}
                  onClick={() => onSelectPlayer?.(player)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: isSelected
                      ? "rgba(22, 59, 122, 0.42)"
                      : "rgba(255, 255, 255, 0.015)",
                    boxShadow: isSelected
                      ? "inset 3px 0 0 #6aa4ff, inset 0 0 0 1px rgba(106, 164, 255, 0.24), 0 0 24px rgba(22, 59, 122, 0.16)"
                      : "none",
                    "&:hover": {
                      backgroundColor: isSelected
                        ? "rgba(22, 59, 122, 0.5)"
                        : "rgba(255, 255, 255, 0.045)",
                    },
                    "& td": {
                      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                      color: "text.primary",
                    },
                  }}
                >
                  <TableCell sx={{ width: 68 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {player.pos}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <Box
                        sx={{
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          bgcolor: tone.dot,
                          boxShadow: `0 0 10px ${tone.dot}55`,
                          flexShrink: 0,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: isSelected || isTop3 ? 700 : 600 }}
                        >
                          {player.name}
                        </Typography>
                        {isTop3 && (
                          <Typography variant="caption" color="text.secondary">
                            Top 3 in current view
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {player.kpi_score ?? "-"}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ color: "text.secondary" }}>
                    {player.target ?? "-"}
                  </TableCell>

                  <TableCell sx={{ color: "text.secondary" }}>
                    {player.time_play ?? "-"}
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: isSelected ? "#f7f9fc" : "text.primary",
                      }}
                    >
                      {formatPercent(performance)}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ width: 124 }}>
                    <Chip
                      label={tone.label}
                      color={tone.color}
                      size="small"
                      sx={{
                        minWidth: 88,
                        justifyContent: "center",
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.25 }}>
        Selection is highlighted in blue. Performance meaning is shown with restrained
        red, amber, and green markers only.
      </Typography>
    </Box>
  );
}
