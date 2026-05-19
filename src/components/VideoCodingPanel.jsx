import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getMatchEvents, createMatchEvent } from "../services/matchEventsApi";

const EVENT_TYPES = [
  "Tackle Made",
  "Tackle Assist",
  "Missed Tackle",
  "Carry",
  "Offload",
  "Line Break",
  "Ruck Clean",
  "Turnover",
  "Penalty Conceded",
  "Handling Error",
];

const EVENT_COLOURS = {
  "Tackle Made":       "#2eaf4a",
  "Tackle Assist":     "#4caf50",
  "Missed Tackle":     "#c62828",
  "Carry":             "#1565c0",
  "Offload":           "#6aa4ff",
  "Line Break":        "#6aa4ff",
  "Ruck Clean":        "#2eaf4a",
  "Turnover":          "#c62828",
  "Penalty Conceded":  "#c62828",
  "Handling Error":    "#f59e0b",
};

const selectSx = {
  color: "#f7f9fc",
  bgcolor: "rgba(255,255,255,0.03)",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.1)" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
  "& .MuiSvgIcon-root": { color: "#5a7aaa" },
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#f7f9fc",
    bgcolor: "rgba(255,255,255,0.03)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&.Mui-focused fieldset": { borderColor: "rgba(198,40,40,0.6)" },
  },
};

const cellSx = {
  color: "#c8d8f0",
  fontSize: "0.82rem",
  borderColor: "rgba(255,255,255,0.04)",
};

export default function VideoCodingPanel({ players }) {
  const [playerName, setPlayerName] = useState("");
  const [eventType, setEventType] = useState("");
  const [matchTime, setMatchTime] = useState("");
  const [notes, setNotes] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMatchEvents()
      .then(setEvents)
      .catch(() => setError("Could not load events. Is the API running?"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!playerName || !eventType) return;

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const created = await createMatchEvent({
        player_name: playerName,
        event_type: eventType,
        match_time: matchTime,
        notes,
      });
      setEvents((prev) => [created, ...prev]);
      setSuccess(true);
      setMatchTime("");
      setNotes("");
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Failed to log event. Is the API running on port 5150?");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{ fontWeight: 800, fontSize: "1.4rem", color: "#f7f9fc", letterSpacing: -0.5 }}
        >
          Video Coding
        </Typography>
        <Typography sx={{ fontSize: "0.85rem", color: "#5a7aaa", mt: 0.5 }}>
          Code match events from video and convert analysis into structured performance data.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        {/* Left column — video placeholder + coding form */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper
            elevation={0}
            sx={{
              mb: 2.5,
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 2.5,
              bgcolor: "#0a1224",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 200,
              gap: 1.5,
              p: 3,
            }}
          >
            <VideoLibraryIcon sx={{ fontSize: 44, color: "#1e3058" }} />
            <Typography sx={{ fontSize: "0.85rem", color: "#3d5a80", fontWeight: 500 }}>
              Upload or embed match video here
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 2.5,
              bgcolor: "#0d1830",
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#f7f9fc", mb: 2.5 }}
            >
              Log Event
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl size="small" fullWidth required>
                <InputLabel sx={{ color: "#5a7aaa" }}>Player</InputLabel>
                <Select
                  value={playerName}
                  label="Player"
                  onChange={(e) => setPlayerName(e.target.value)}
                  sx={selectSx}
                >
                  {players.map((p) => (
                    <MenuItem key={p.name} value={p.name} sx={{ fontSize: "0.85rem" }}>
                      {p.pos}. {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth required>
                <InputLabel sx={{ color: "#5a7aaa" }}>Event Type</InputLabel>
                <Select
                  value={eventType}
                  label="Event Type"
                  onChange={(e) => setEventType(e.target.value)}
                  sx={selectSx}
                >
                  {EVENT_TYPES.map((et) => (
                    <MenuItem key={et} value={et} sx={{ fontSize: "0.85rem" }}>
                      {et}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                size="small"
                label="Match Time"
                placeholder="e.g. 12:43"
                value={matchTime}
                onChange={(e) => setMatchTime(e.target.value)}
                sx={inputSx}
                InputLabelProps={{ sx: { color: "#5a7aaa" } }}
              />

              <TextField
                size="small"
                label="Notes"
                placeholder="Optional context..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                multiline
                rows={2}
                sx={inputSx}
                InputLabelProps={{ sx: { color: "#5a7aaa" } }}
              />

              {success && (
                <Alert
                  icon={<CheckCircleIcon fontSize="small" />}
                  sx={{
                    bgcolor: "rgba(46,175,74,0.1)",
                    color: "#2eaf4a",
                    border: "1px solid rgba(46,175,74,0.2)",
                    borderRadius: 2,
                    fontSize: "0.82rem",
                  }}
                >
                  Event logged successfully.
                </Alert>
              )}

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    bgcolor: "rgba(198,40,40,0.1)",
                    color: "#ef9a9a",
                    border: "1px solid rgba(198,40,40,0.2)",
                    borderRadius: 2,
                    fontSize: "0.82rem",
                  }}
                >
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                disabled={!playerName || !eventType || submitting}
                sx={{
                  bgcolor: "primary.main",
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: "none",
                  letterSpacing: 0.2,
                  "&:hover": { bgcolor: "#d32f2f" },
                  "&.Mui-disabled": { bgcolor: "rgba(198,40,40,0.3)", color: "rgba(255,255,255,0.4)" },
                }}
              >
                {submitting ? (
                  <CircularProgress size={18} sx={{ color: "#fff" }} />
                ) : (
                  "Log Event"
                )}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right column — event log */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 2.5,
              bgcolor: "#0d1830",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#f7f9fc" }}>
                Event Log
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#5a7aaa" }}>
                {events.length} event{events.length !== 1 ? "s" : ""} recorded
              </Typography>
            </Box>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                <CircularProgress size={24} sx={{ color: "#5a7aaa" }} />
              </Box>
            ) : events.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <Typography sx={{ fontSize: "0.85rem", color: "#3d5a80" }}>
                  No events logged yet. Start coding from video above.
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {["Time", "Player", "Event", "Notes", "Logged At"].map((h) => (
                        <TableCell
                          key={h}
                          sx={{
                            color: "#5a7aaa",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 0.8,
                            borderColor: "rgba(255,255,255,0.06)",
                            pb: 1.5,
                          }}
                        >
                          {h}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {events.map((ev) => (
                      <TableRow
                        key={ev.id}
                        sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.025)" } }}
                      >
                        <TableCell sx={cellSx}>{ev.match_time || "—"}</TableCell>
                        <TableCell sx={{ ...cellSx, fontWeight: 600 }}>{ev.player_name}</TableCell>
                        <TableCell sx={cellSx}>
                          <Chip
                            label={ev.event_type}
                            size="small"
                            sx={{
                              bgcolor: `${EVENT_COLOURS[ev.event_type] || "#163b7a"}22`,
                              color: EVENT_COLOURS[ev.event_type] || "#6aa4ff",
                              border: `1px solid ${EVENT_COLOURS[ev.event_type] || "#163b7a"}55`,
                              fontWeight: 700,
                              fontSize: "0.68rem",
                              height: 22,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            ...cellSx,
                            color: "#5a7aaa",
                            maxWidth: 160,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {ev.notes || "—"}
                        </TableCell>
                        <TableCell sx={{ ...cellSx, color: "#3d5a80", whiteSpace: "nowrap" }}>
                          {new Date(ev.created_at).toLocaleTimeString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
