import { Link } from 'react-router';
import './Placeholder.css';

const Placeholder = ({ title, message = 'Esta seção ainda não foi implementada.' }) => (
  <section className="placeholder">
    <h1>{title}</h1>
    <p>{message}</p>
    <Link to="/">Voltar para o início</Link>
  </section>
);

export default Placeholder;
