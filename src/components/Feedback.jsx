import './Feedback.css';

export const LoadingScreen = () => (
  <div className="feedback" role="status">
    <div className="feedback--spinner" />
    <p>Carregando…</p>
  </div>
);

export const ErrorScreen = ({ error }) => (
  <div className="feedback" role="alert">
    <p>Não foi possível carregar o catálogo.</p>
    <p className="feedback--detail">{error.message}</p>
  </div>
);
