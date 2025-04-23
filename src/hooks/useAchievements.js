import { useState, useEffect } from "react";

export function useAchievements() {
  const [data, setData] = useState({ rarest: [], all: [] });
  useEffect(() => {
    // replace with fetch from Supabase

    setTimeout(() => {
      setData({ rarest: fake.slice(0, 3), all: fake.concat(fake, fake) });
    }, 300);
  }, []);
  return data;
}
