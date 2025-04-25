export async function getRegionViaGeolocation() {
  const CACHE_KEY = "cineo.region";
  const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 h
  const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");

  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.code; // "BA", "HR", …
  }

  if (!("geolocation" in navigator)) return null;

  const coords = await new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve(coords),
      () => resolve(null), // permission denied or error
      { maximumAge: 86_400_000, timeout: 8000 } // 8 s
    );
  });

  if (!coords) return null;

  const url =
    `https://api.bigdatacloud.net/data/reverse-geocode-client` +
    `?latitude=${coords.latitude}&longitude=${coords.longitude}` +
    `&localityLanguage=en`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    const code = json.countryCode || null;

    if (code) {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ code, ts: Date.now() }));
    }

    return code;
  } catch {
    return null;
  }
}
