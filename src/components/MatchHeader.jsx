export default function MatchHeader({ title, subtitle }) {
  return (
    <header style={{ padding: 16 }}>
      <h1 style={{ margin: 0 }}>{title}</h1>
      <p style={{ marginTop: 6 }}>{subtitle}</p>
    </header>
  );
}
