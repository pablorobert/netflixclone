import { useEffect, useState } from 'react';
import { getHomeList, getMovieInfo } from './api/tmdb.js';
import Header from './components/Header.jsx';
import MovieRow from './components/MovieRow.jsx';
import FeaturedMovie from './components/FeaturedMovie.jsx';
import './App.css';

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredMovieData, setFeaturedMovieData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadAll = async () => {
      try {
        const list = await getHomeList();
        if (!active) return;
        setMovieList(list);

        const originals = list.find((section) => section.slug === 'originals');
        const results = originals?.items?.results ?? [];
        if (results.length === 0) return;

        const chosen = results[Math.floor(Math.random() * results.length)];
        const chosenInfo = await getMovieInfo(chosen.id, 'tv');
        if (active) setFeaturedMovieData(chosenInfo);
      } catch (err) {
        if (active) setError(err);
      }
    };

    loadAll();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const scrollListener = () => setBlackHeader(window.scrollY > 10);

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredMovieData && <FeaturedMovie item={featuredMovieData} />}

      <section className="lists">
        {movieList.map((item) => (
          <MovieRow key={item.slug} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        <p>Projeto de estudo. Não afiliado à Netflix.</p>
        <p>
          Dados fornecidos por{' '}
          <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer">
            TMDB
          </a>
          .
        </p>
      </footer>

      {error && (
        <div className="feedback" role="alert">
          <p>Não foi possível carregar o catálogo.</p>
          <p className="feedback--detail">{error.message}</p>
        </div>
      )}

      {!error && movieList.length === 0 && (
        <div className="feedback" role="status">
          <div className="feedback--spinner" />
          <p>Carregando…</p>
        </div>
      )}
    </div>
  );
};

export default App;
