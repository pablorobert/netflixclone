import { Route, Routes } from 'react-router';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Placeholder from './pages/Placeholder.jsx';
import { NAV_ITEMS } from './navItems.js';
import { useScrolledPast } from './hooks/useScrolledPast.js';
import './App.css';

const SECTION_ROUTES = NAV_ITEMS.filter((item) => item.path !== '/');

const App = () => {
  const scrolled = useScrolledPast(10);

  return (
    <div className="page">
      <Header black={scrolled} />

      <Routes>
        <Route path="/" element={<Home />} />

        {SECTION_ROUTES.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={<Placeholder title={item.label} />}
          />
        ))}

        <Route path="/watch/:id" element={<Placeholder title="Player" />} />
        <Route path="/list/add/:id" element={<Placeholder title="Minha lista" />} />

        <Route
          path="*"
          element={
            <Placeholder
              title="Página não encontrada"
              message="O endereço acessado não existe neste catálogo."
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
