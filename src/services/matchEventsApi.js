const API_BASE_URL = "http://localhost:5150/api";

export async function getMatchEvents() {
  const res = await fetch(`${API_BASE_URL}/matchevents`);
  if (!res.ok) throw new Error(`Failed to fetch events: ${res.statusText}`);
  return res.json();
}

export async function createMatchEvent(event) {
  const res = await fetch(`${API_BASE_URL}/matchevents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!res.ok) throw new Error(`Failed to create event: ${res.statusText}`);
  return res.json();
}
