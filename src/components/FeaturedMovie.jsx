import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import './FeaturedMovie.css';

const MAX_DESCRIPTION = 250;

const FeaturedMovie = ({ item }) => {
  const year = item.first_air_date ? new Date(item.first_air_date).getFullYear() : null;
  const genres = (item.genres ?? []).map((genre) => genre.name);
  const seasons = item.number_of_seasons;

  const overview = item.overview ?? '';
  const description =
    overview.length > MAX_DESCRIPTION ? `${overview.slice(0, 200)}...` : overview;

  return (
    <section
      className="featured"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <h1 className="featured--name">{item.name ?? item.title}</h1>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average?.toFixed(1)} pontos</div>
            {year && <div className="featured--year">{year}</div>}
            {seasons > 0 && (
              <div className="featured--seasons">
                {seasons} temporada{seasons > 1 ? 's' : ''}
              </div>
            )}
          </div>
          <div className="featured--description">{description}</div>
          <div className="featured--buttons">
            <a className="featured--watchbutton" href={`/watch/${item.id}`}>
              <PlayArrowIcon /> Assistir
            </a>
            <a className="featured--mylistbutton" href={`/list/add/${item.id}`}>
              <AddIcon /> Minha lista
            </a>
          </div>
          {genres.length > 0 && (
            <div className="featured--genres">
              <strong>Gêneros </strong>
              {genres.join(', ')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovie;
