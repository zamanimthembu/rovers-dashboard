export default function PlayerDetails({ player }) {
  if (!player) {
    return (
      <section style={{ padding: 12, border: "1px solid #ddd" }}>
        <h3 style={{ marginTop: 0 }}>Player Details</h3>
        <p>Click a player in the table to see details.</p>
      </section>
    );
  }

  const perfText =
    player.perfomance_pct == null ? "-" : Math.round(player.perfomance_pct * 100) + "%";

  return (
    <section style={{ padding: 12, border: "1px solid #ddd" }}>
      <h3 style={{ marginTop: 0 }}>Player Details</h3>

      <p style={{ margin: "8px 0" }}>
        <strong>{player.name}</strong> (Pos {player.pos})
      </p>

      <ul style={{ margin: 0, paddingLeft: 18 }}>
        <li>KPI Score: {player.kpi_score ?? "-"}</li>
        <li>Target: {player.target ?? "-"}</li>
        <li>Time: {player.time_play ?? "-"}</li>
        <li>Perf %: {perfText}</li>
      </ul>
    </section>
  );
}
