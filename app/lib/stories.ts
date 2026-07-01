import { Story } from "@/app/types/story";

const API_BASE = "http://localhost:5000"; // matches the rest of the app; centralize later if you add an env var

export async function fetchApprovedStories(): Promise<Story[]> {
  const res = await fetch(`${API_BASE}/api/story`);

  if (!res.ok) {
    throw new Error(`Failed to fetch stories: ${res.status}`);
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to fetch stories");
  }

  return json.data as Story[];
}