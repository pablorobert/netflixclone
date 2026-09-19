import { useEffect, useState } from 'react';
import { getHomeList, getMovieInfo } from '../api/tmdb.js';

const pickFeatured = (sections) => {
  const originals = sections.find((section) => section.slug === 'originals');
  const results = originals?.items?.results ?? [];
  if (results.length === 0) return null;
  return results[Math.floor(Math.random() * results.length)];
};

/**
 * Carrega as seções da home e sorteia o título em destaque entre os
 * "Originais da Netflix".
 */
export const useHomeCatalog = () => {
  const [sections, setSections] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const list = await getHomeList();
        if (!active) return;
        setSections(list);

        const chosen = pickFeatured(list);
        if (!chosen) return;

        const info = await getMovieInfo(chosen.id, 'tv');
        if (active) setFeatured(info);
      } catch (err) {
        if (active) setError(err);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  return {
    sections,
    featured,
    error,
    isLoading: !error && sections.length === 0,
  };
};
