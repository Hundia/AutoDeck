import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function GitHubStarCounter() {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CACHE_KEY = 'autodeck-gh-stars';
    const TTL = 3_600_000; // 1 hour

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { count, ts } = JSON.parse(cached);
        if (Date.now() - ts < TTL) {
          setStars(count);
          setLoading(false);
          return;
        }
      }
    } catch {}

    fetch('https://api.github.com/repos/Hundia/AutoDeck')
      .then(r => r.json())
      .then(data => {
        const count = data.stargazers_count ?? 0;
        localStorage.setItem(CACHE_KEY, JSON.stringify({ count, ts: Date.now() }));
        setStars(count);
      })
      .catch(() => setStars(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <span className="inline-block w-8 h-4 bg-white/10 rounded animate-pulse" />;
  if (stars === null) return <span>—</span>;
  return (
    <span className="flex items-center gap-1">
      <Star size={14} className="text-yellow-400" />
      {stars.toLocaleString()}
    </span>
  );
}
