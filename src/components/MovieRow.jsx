import { useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './MovieRow.css';

const ITEM_WIDTH = 150;

const MovieRow = ({ title, items }) => {
  const [scrollX, setScrollX] = useState(0);

  const results = (items?.results ?? []).filter((item) => item.poster_path);
  const listWidth = results.length * ITEM_WIDTH;

  const handleLeftArrow = () => {
    setScrollX((current) => Math.min(current + Math.round(window.innerWidth / 2), 0));
  };

  const handleRightArrow = () => {
    setScrollX((current) => {
      const next = current - Math.round(window.innerWidth / 2);
      const limit = window.innerWidth - listWidth - 60;
      return next < limit ? limit : next;
    });
  };

  if (results.length === 0) return null;

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <button type="button" className="movieRow--left" onClick={handleLeftArrow} aria-label="Voltar">
        <NavigateBeforeIcon sx={{ fontSize: 50 }} />
      </button>
      <button type="button" className="movieRow--right" onClick={handleRightArrow} aria-label="Avançar">
        <NavigateNextIcon sx={{ fontSize: 50 }} />
      </button>
      <div className="movieRow--listarea">
        <div className="movieRow--list" style={{ marginLeft: scrollX, width: listWidth }}>
          {results.map((item) => (
            <div key={item.id} className="movieRow--item">
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title ?? item.name ?? ''}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
