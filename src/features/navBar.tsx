import React from 'react';
import { NavLink } from 'react-router-dom';
import CustomIcon from './icon.tsx';
import dalle from './icon/DALLE.png';
import '../pages/design/navbar.css';

const Links = [
  { name: 'Home', path: '/' },
  { name: 'Detailierte Ansicht', path: '/detailAnsicht' },
  { name: 'Suche Buch', path: '/sucheBuch' },
  { name: 'Ändere Buch', path: '/ändereBuch' },
  { name: 'Erstelle Buch', path: '/neuesBuch' },
  { name: 'Login', path: '/login' }
];

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <CustomIcon imageSrc={dalle} altText="DALLE" navigateTo="/" />
        <h1 className="span">Book Vault</h1>
      </div>

      <ul className="nav-links">
        {Links.map(({ name, path }) => (
          <li key={name}>
            <NavLink
              to={path}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
