const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint, params = {}) => {
  if (!API_KEY) {
    throw new Error('VITE_TMDB_API_KEY não definida. Copie .env.example para .env.local.');
  }

  const query = new URLSearchParams({
    language: 'pt-BR',
    api_key: API_KEY,
    ...params,
  });

  const res = await fetch(`${API_BASE}${endpoint}?${query}`);
  if (!res.ok) {
    throw new Error(`TMDB ${endpoint} respondeu ${res.status}`);
  }
  return res.json();
};

const HOME_SECTIONS = [
  { slug: 'originals', title: 'Originais da Netflix', endpoint: '/discover/tv', params: { with_networks: '213' } },
  { slug: 'trending', title: 'Recomendados', endpoint: '/trending/all/week' },
  { slug: 'toprated', title: 'Em alta', endpoint: '/movie/top_rated' },
  { slug: 'action', title: 'Ação', endpoint: '/discover/movie', params: { with_genres: '28' } },
  { slug: 'comedy', title: 'Comédia', endpoint: '/discover/movie', params: { with_genres: '35' } },
  { slug: 'horror', title: 'Terror', endpoint: '/discover/movie', params: { with_genres: '27' } },
  { slug: 'romance', title: 'Romance', endpoint: '/discover/movie', params: { with_genres: '10749' } },
  { slug: 'documentary', title: 'Documentário', endpoint: '/discover/movie', params: { with_genres: '99' } },
];

export const getHomeList = async () => {
  // As seções são independentes: busca todas em paralelo.
  const results = await Promise.all(
    HOME_SECTIONS.map(({ endpoint, params }) => basicFetch(endpoint, params))
  );

  return HOME_SECTIONS.map(({ slug, title }, index) => ({
    slug,
    title,
    items: results[index],
  }));
};

export const getMovieInfo = async (movieId, movieType) => {
  if (!movieId || (movieType !== 'movie' && movieType !== 'tv')) {
    return null;
  }
  return basicFetch(`/${movieType}/${movieId}`);
};

export default { getHomeList, getMovieInfo };
