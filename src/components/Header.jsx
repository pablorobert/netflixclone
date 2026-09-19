import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';

const NAV_ITEMS = [
  { label: 'Início', href: '/', active: true },
  { label: 'Séries', href: '/series' },
  { label: 'Filmes', href: '/filmes' },
  { label: 'Jogos', href: '/jogos' },
  { label: 'Bombando', href: '/bombando' },
  { label: 'Minha Netflix', href: '/minha-netflix' },
  { label: 'Navegar por idiomas', href: '/idiomas' },
];

const NOTIFICATION_COUNT = 8;

const Header = ({ black }) => (
  <header className={black ? 'black' : ''}>
    <div className="header--left">
      <a className="header--logo" href="/">
        <img
          alt="Netflix"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        />
      </a>

      <nav className="header--nav" aria-label="Principal">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={item.active ? 'active' : ''}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>

    <div className="header--right">
      <button type="button" className="header--iconbutton" aria-label="Buscar">
        <SearchIcon />
      </button>

      <button
        type="button"
        className="header--iconbutton header--notifications"
        aria-label={`Notificações (${NOTIFICATION_COUNT} não lidas)`}
      >
        <NotificationsIcon />
        <span className="header--badge" aria-hidden="true">
          {NOTIFICATION_COUNT}
        </span>
      </button>

      <button type="button" className="header--user" aria-label="Conta">
        <img alt="" src="/favicon.svg" />
        <ArrowDropDownIcon />
      </button>
    </div>
  </header>
);

export default Header;
