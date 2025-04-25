const YT_BASE = "https://www.googleapis.com/youtube/v3";
const YT_KEY = import.meta.env.VITE_YOUTUBE_KEY;

export async function searchTrailerOnYouTube(title, year, abortSignal) {
  const q = `${title} ${year} official trailer`;
  const url = new URL(`${YT_BASE}/search`);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", q);
  url.searchParams.set("type", "video");
  url.searchParams.set("videoEmbeddable", "true");
  url.searchParams.set("maxResults", "1");
  url.searchParams.set("key", YT_KEY);

  const res = await fetch(url, { signal: abortSignal });
  if (!res.ok) throw new Error("YouTube search failed");
  const json = await res.json();

  const item = json.items?.[0];
  return item ? item.id.videoId : null;
}
