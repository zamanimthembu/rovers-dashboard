export default function PlayersTable({ players }) {
  return (
    <section style={{ marginTop: 24 }}>
      <h2>Players</h2>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Name</th>
            <th>KPI Score</th>
            <th>Target</th>
            <th>Time</th>
            <th>Perf %</th>
          </tr>
        </thead>

        <tbody>
          {(players || []).map((p) => (
            <tr key={p.pos}>
              <td>{p.pos}</td>
              <td>{p.name}</td>
              <td>{p.kpi_score ?? "-"}</td>
              <td>{p.target ?? "-"}</td>
              <td>{p.time_play ?? "-"}</td>
              <td>
                {p.perfomance_pct == null
                  ? "-"
                  : Math.round(p.perfomance_pct * 100) + "%"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
