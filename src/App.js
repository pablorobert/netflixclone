import React, { useEffect, useState } from 'react';
import TMDB from './TMDB.js';
import Header from './components/Header';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie.js';
import './App.css';

const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredMovieData, setFeaturedMovieData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect( () => {
    const loadAll = async () => {
      //lista total
      let list = await TMDB.getHomeList();
      console.log(list);
      setMovieList(list);
      //feature
      let originals = list.filter(x => x.slug === "originals");
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];

      //console.log(chosen);

      let chosenInfo = await TMDB.getMovieInfo(chosen.id, 'tv');
      //console.log(chosenInfo);
      setFeaturedMovieData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect( () => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader}/>
    
      {featuredMovieData && 
      <FeaturedMovie item={featuredMovieData}/>}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Tutorial

        Todos os direitos reservados para a netflix

        Dados obtidos pelo site https://themoviedb.org
        </footer>
        {movieList.length <=0 && 
          <div className="loading">
            <img alt="carregando" src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"/>
          </div>
        }
    </div>
  );
}

export default App;