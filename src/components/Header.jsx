import { NavLink } from 'react-router';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { NAV_ITEMS } from '../navItems.js';
import './Header.css';

const NOTIFICATION_COUNT = 8;

const Header = ({ black }) => (
  <header className={black ? 'black' : ''}>
    <div className="header--left">
      <NavLink className="header--logo" to="/">
        <img
          alt="Netflix"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        />
      </NavLink>

      <nav className="header--nav" aria-label="Principal">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.label}
              </NavLink>
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
