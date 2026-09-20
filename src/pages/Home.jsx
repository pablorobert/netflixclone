import FeaturedMovie from '../components/FeaturedMovie.jsx';
import MovieRowList from '../components/MovieRowList.jsx';
import { ErrorScreen, LoadingScreen } from '../components/Feedback.jsx';
import { useHomeCatalog } from '../hooks/useHomeCatalog.js';

const Home = () => {
  const { sections, featured, error, isLoading } = useHomeCatalog();

  return (
    <>
      {featured && <FeaturedMovie item={featured} />}

      <MovieRowList sections={sections} />

      {error && <ErrorScreen error={error} />}
      {isLoading && <LoadingScreen />}
    </>
  );
};

export default Home;
