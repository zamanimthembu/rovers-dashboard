import { useMemo, useState } from "react";

function isForward(pos) {
  // Rugby: 1–8 are forwards, 9–15 backs, 16–23 bench (we’ll treat bench by their number too)
  return pos >= 1 && pos <= 8;
}

function isBack(pos) {
  return pos >= 9 && pos <= 15;
}

export default function PlayersTable({ players }) {
  const [filter, setFilter] = useState("ALL"); // ALL | FORWARDS | BACKS

  const filteredAndSorted = useMemo(() => {
    const list = (players || []).filter((p) => p?.name);

    const filtered =
      filter === "FORWARDS"
        ? list.filter((p) => isForward(p.pos))
        : filter === "BACKS"
        ? list.filter((p) => isBack(p.pos))
        : list;

    // sort by performance % (highest first). If null, treat as -1 so they go to bottom
    return filtered.sort((a, b) => {
      const aPerf = a.perfomance_pct ?? -1;
      const bPerf = b.perfomance_pct ?? -1;
      return bPerf - aPerf;
    });
  }, [players, filter]);

  // Top 3 *within the currently filtered list*
  const top3Positions = new Set(filteredAndSorted.slice(0, 3).map((p) => p.pos));

  return (
    <section style={{ marginTop: 24 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Players</h2>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={() => setFilter("ALL")} disabled={filter === "ALL"}>
            All
          </button>
          <button
            onClick={() => setFilter("FORWARDS")}
            disabled={filter === "FORWARDS"}
          >
            Forwards
          </button>
          <button onClick={() => setFilter("BACKS")} disabled={filter === "BACKS"}>
            Backs
          </button>
        </div>
      </div>

      <p style={{ marginTop: 8 }}>
        Showing <strong>{filteredAndSorted.length}</strong> players (sorted by Perf %)
      </p>

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
          {filteredAndSorted.map((p) => {
            const isTop3 = top3Positions.has(p.pos);
            const perfText =
              p.perfomance_pct == null
                ? "-"
                : Math.round(p.perfomance_pct * 100) + "%";

            return (
              <tr
                key={p.pos}
                style={{
                  fontWeight: isTop3 ? "700" : "400",
                  background: isTop3 ? "#fff7cc" : "transparent",
                }}
              >
                <td>{p.pos}</td>
                <td>{p.name}</td>
                <td>{p.kpi_score ?? "-"}</td>
                <td>{p.target ?? "-"}</td>
                <td>{p.time_play ?? "-"}</td>
                <td>{perfText}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p style={{ marginTop: 8 }}>
        <em>Tip:</em> top 3 are highlighted based on the current filter.
      </p>
    </section>
  );
}
