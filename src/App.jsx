import { useMemo, useState } from "react";
import { MATCHES } from "./data/matches";
import AppShell from "./components/AppShell";
import OverviewPanel from "./components/OverviewPanel";
import SquadPanel from "./components/SquadPanel";
import StandardsPanel from "./components/StandardsPanel";
import VideoCodingPanel from "./components/VideoCodingPanel";
import LoginScreen from "./components/LoginScreen";
import { isAuthenticated, logout } from "./services/auth";

export default function App() {
  const [authed, setAuthed] = useState(isAuthenticated());
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMatchId, setSelectedMatchId] = useState(MATCHES[0].id);
  const [posFilter, setPosFilter] = useState("ALL");

  const roversData = useMemo(
    () => MATCHES.find((m) => m.id === selectedMatchId)?.data ?? MATCHES[0].data,
    [selectedMatchId]
  );

  const playersAll = useMemo(
    () => (roversData.player_stats || []).filter((p) => p?.name),
    [roversData]
  );

  const players = useMemo(() => {
    if (posFilter === "FORWARDS") return playersAll.filter((p) => p.pos <= 8);
    if (posFilter === "BACKS") return playersAll.filter((p) => p.pos >= 9);
    return playersAll;
  }, [playersAll, posFilter]);

  const teamChartData = useMemo(() => {
    const toNumber = (v) => {
      if (typeof v === "number") return v;
      const m = String(v).match(/-?\d+(\.\d+)?/g);
      return m?.length ? Number(m[m.length - 1]) : 0;
    };
    const cleanName = (raw = "") => raw.replace(/\s*\([^)]*\)\s*$/, "");
    return (roversData.team_kpis || []).map((k) => ({
      name: cleanName(k.metric_raw),
      target: toNumber(k.target_raw),
      actual: toNumber(k.value_raw),
    }));
  }, [roversData]);

  function handleMatchChange(id) {
    setSelectedMatchId(id);
    setPosFilter("ALL");
  }

  function handleLogout() {
    logout();
    setAuthed(false);
  }

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  return (
    <AppShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      matches={MATCHES}
      selectedMatchId={selectedMatchId}
      onMatchChange={handleMatchChange}
      onLogout={handleLogout}
    >
      {activeTab === "overview" && (
        <OverviewPanel
          players={players}
          teamKpis={roversData?.team_kpis}
          teamChartData={teamChartData}
        />
      )}

      {activeTab === "squad" && (
        <SquadPanel
          players={playersAll}
          posFilter={posFilter}
          onPosFilterChange={setPosFilter}
        />
      )}

      {activeTab === "standards" && (
        <StandardsPanel teamKpis={roversData?.team_kpis} />
      )}

      {activeTab === "video-coding" && (
        <VideoCodingPanel players={playersAll} />
      )}
    </AppShell>
  );
}
