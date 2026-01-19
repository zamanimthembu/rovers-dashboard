import MatchHeader from "./components/MatchHeader";
import TeamKpis from "./components/TeamKpis";
import PlayersTable from "./components/PlayersTable";

import roversData from "./data/rovers_vc_game1_clean.json";

export default function App() {
  const players = (roversData.player_stats || []).filter((p) => p?.name);

  return (
    <div style={{ padding: 16 }}>
      <MatchHeader title="College Rovers – Match Dashboard" subtitle="vs VC • Game 1" />

      <TeamKpis teamKpis={roversData.team_kpis} />

      <PlayersTable players={players} />
    </div>
  );
}
