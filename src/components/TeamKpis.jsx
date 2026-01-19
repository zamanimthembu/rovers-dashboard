export default function TeamKpis({ teamKpis }) {
  return (
    <section style={{ marginTop: 24 }}>
      <h2>Team KPIs</h2>

      <ul>
        {(teamKpis || []).map((kpi, idx) => (
          <li key={idx}>
            <strong>{kpi.metric_raw}</strong> — target: {kpi.target_raw} — value:{" "}
            {kpi.value_raw}
          </li>
        ))}
      </ul>
    </section>
  );
}
