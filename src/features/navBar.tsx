import { Box, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.tsx';
import '../pages/design/navbar.css';
import CustomIcon from './icon.tsx';
import dalle from './icon/DALLE.png';

const Links = [
  { name: 'Home', path: '/homepage' },
  { name: 'Suche Buch', path: '/' },
  { name: 'Erstelle Buch', path: '/neuesBuch' },
  { name: 'Login', path: '/login' },
];

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Box
      className="navbar"
      bg={isDarkMode ? '#000' : '#fff'}
      color={isDarkMode ? '#fff' : '#000'}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={5}
      py={3}
      boxShadow="lg"
      borderBottom="2px solid #cc9600"
    >
      {/* Logo Section */}
      <Box className="navbar-logo" display="flex" alignItems="center" gap={3}>
        <CustomIcon imageSrc={dalle} altText="DALLE" navigateTo="/" />
        <h1
          className="span"
          style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#cc9600' }}
        >
          Book Vault
        </h1>
      </Box>

      {/* Navigation Links */}
      <Box className="nav-links" display="flex" gap={5}>
        {Links.map(({ name, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) => (isActive ? 'active' : '')}
            style={{
              textDecoration: 'none',
              fontWeight: 'medium',
              fontSize: '1rem',
              padding: '5px 10px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              color: isDarkMode ? '#fff' : '#000',
            }}
          >
            {name}
          </NavLink>
        ))}
      </Box>

      {/* Background Toggle Button */}
      <Button
        onClick={toggleTheme}
        bg={isDarkMode ? '#fff' : '#000'}
        color={isDarkMode ? '#000' : '#fff'}
        _hover={{ bg: '#cc9600', color: '#000' }}
        size="sm"
        borderRadius="md"
      >
        {isDarkMode ? 'Helles Thema' : 'Dunkles Thema'}
      </Button>
    </Box>
  );
};

export default Navbar;
