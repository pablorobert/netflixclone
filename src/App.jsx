import Header from './components/Header.jsx';
import FeaturedMovie from './components/FeaturedMovie.jsx';
import MovieRowList from './components/MovieRowList.jsx';
import Footer from './components/Footer.jsx';
import { ErrorScreen, LoadingScreen } from './components/Feedback.jsx';
import { useHomeCatalog } from './hooks/useHomeCatalog.js';
import { useScrolledPast } from './hooks/useScrolledPast.js';
import './App.css';

const App = () => {
  const { sections, featured, error, isLoading } = useHomeCatalog();
  const scrolled = useScrolledPast(10);

  return (
    <div className="page">
      <Header black={scrolled} />

      {featured && <FeaturedMovie item={featured} />}

      <MovieRowList sections={sections} />

      <Footer />

      {error && <ErrorScreen error={error} />}
      {isLoading && <LoadingScreen />}
    </div>
  );
};

export default App;
